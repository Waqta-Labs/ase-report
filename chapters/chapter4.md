# Capítulo IV: Strategic-Level Software Design

## 4.1. Strategic-Level Attribute-Driven Design

## 4.1.1. Design Purpose

El proposito del diseno estrategico de AuxIA es definir una base arquitectonica que permita responder a los principales problemas identificados durante el needfinding: informacion dispersa entre canales, dificultad para priorizar zonas afectadas, riesgo de duplicidad en la entrega de ayuda, baja trazabilidad de evidencias y limitaciones para auditar decisiones tomadas durante una emergencia. Bajo el enfoque Attribute-Driven Design (ADD), estas necesidades se convierten en drivers arquitectonicos que orientan la seleccion de componentes, responsabilidades, integraciones y restricciones tecnicas del sistema.

AuxIA se plantea como un sistema de apoyo a la decision para la distribucion de ayuda ante desastres. Por ello, la arquitectura debe permitir registrar reportes de campo, estructurar informacion mediante NLP, calcular un score de urgencia, recomendar una distribucion de recursos, mantener inventario actualizado, registrar entregas con evidencia y generar trazabilidad verificable mediante Blockchain. Sin embargo, la decision final no debe quedar delegada completamente al algoritmo: la autoridad responsable conserva la capacidad de aprobar, modificar o justificar las recomendaciones del sistema.

El diseno tambien debe considerar el contexto operativo del producto. AuxIA sera utilizado por autoridades, voluntarios, entidades de ayuda, ciudadanos afectados y auditores, en escenarios donde puede existir presion de tiempo, conectividad limitada y necesidad de proteger informacion sensible. Por ese motivo, las decisiones arquitectonicas deben equilibrar rapidez de respuesta, explicabilidad de la priorizacion, seguridad, privacidad, mantenibilidad y trazabilidad verificable.

## 4.1.2. Attribute-Driven Design Inputs

Los insumos del proceso ADD se toman de los hallazgos del Capitulo II, las User Stories y Product Backlog del Capitulo III, y el alcance tecnico definido para AuxIA. A partir de estos insumos se identifican las funcionalidades primarias, los escenarios de atributos de calidad y las restricciones que condicionan las decisiones arquitectonicas.

### 4.1.2.1. Primary Functionality / Primary User Stories

Las siguientes historias representan las funcionalidades con mayor impacto arquitectonico para AuxIA. No se listan todas las historias del Product Backlog, sino aquellas que condicionan directamente la estructura del sistema, los servicios principales, la persistencia de datos, la integracion con IA, la integracion con Blockchain y los mecanismos de trazabilidad.

| Epic / User Story ID | Titulo | Descripcion | Criterios de Aceptacion | Relacionado con (Epic ID) |
|---|---|---|---|---|
| EP-01 | Ingesta y estructuracion de reportes de campo (NLP) | Agrupa las funcionalidades que permiten registrar reportes de campo en lenguaje natural y transformarlos en datos estructurados para comparar zonas afectadas. | - | - |
| US-01 | Registrar un reporte de campo en lenguaje natural | Como autoridad responsable de atender desastres, quiero registrar un reporte de campo redactado en lenguaje natural, para dejar constancia de la situacion de una zona sin completar formularios extensos. | **Escenario 1:** Dado que la autoridad cuenta con acceso a la plataforma, cuando registra el texto de un reporte de campo, entonces el sistema guarda el reporte y lo asocia a la zona indicada.<br><br>**Escenario 2:** Dado que el reporte registrado no incluye ninguna zona identificable, cuando el sistema intenta asociarlo, entonces se marca el reporte como pendiente de asignacion de zona. | EP-01 |
| US-02 | Extraer automaticamente variables clave de un reporte | Como autoridad responsable de atender desastres, quiero que el sistema extraiga automaticamente variables clave del reporte, para comparar zonas sin leer manualmente cada reporte. | **Escenario 1:** Dado que un reporte fue registrado en lenguaje natural, cuando el sistema lo procesa mediante NLP, entonces se generan las variables estructuradas correspondientes.<br><br>**Escenario 2:** Dado que el reporte contiene informacion ambigua o incompleta, cuando el sistema lo procesa, entonces las variables no identificadas quedan marcadas como no disponibles. | EP-01 |
| EP-02 | Priorizacion de zonas afectadas | Agrupa las funcionalidades relacionadas con el calculo, explicacion y ajuste del score de urgencia usado para priorizar zonas afectadas. | - | - |
| US-04 | Calcular el score de urgencia de una zona | Como autoridad responsable de atender desastres, quiero que el sistema calcule un score de urgencia por zona, para identificar rapidamente cuales requieren atencion prioritaria. | **Escenario 1:** Dado que una zona cuenta con variables estructuradas suficientes, cuando el sistema calcula su score de urgencia, entonces se genera un valor numerico asociado a esa zona y a la fecha del calculo.<br><br>**Escenario 2:** Dado que una zona no cuenta con variables suficientes, cuando el sistema intenta calcular su score, entonces la zona se marca como "score no disponible". | EP-02 |
| US-05 | Visualizar la explicacion del score de una zona | Como autoridad responsable de atender desastres, quiero conocer que variables influyen mas en el score de una zona, para sustentar la decision de priorizacion ante terceros. | **Escenario 1:** Dado que una zona tiene un score de urgencia calculado, cuando la autoridad solicita el detalle explicativo, entonces se muestran las variables que mas influyeron en dicho score.<br><br>**Escenario 2:** Dado que el detalle explicativo fue generado, cuando se exporta un reporte de la zona, entonces la explicacion del score queda incluida en el documento exportado. | EP-02 |
| EP-03 | Gestion de inventario de recursos | Agrupa las funcionalidades para registrar, consultar y controlar los recursos humanitarios disponibles para distribucion. | - | - |
| US-09 | Consultar el inventario disponible | Como autoridad responsable de atender desastres, quiero consultar en cualquier momento el inventario disponible por tipo de recurso, para decidir cuanto se puede distribuir sin exceder el stock real. | **Escenario 1:** Dado que existen recursos registrados, cuando la autoridad consulta el inventario, entonces se muestra la cantidad disponible actualizada de cada recurso.<br><br>**Escenario 2:** Dado que un recurso fue reservado para una distribucion aprobada, cuando se consulta el inventario, entonces la cantidad reservada se refleja como no disponible. | EP-03 |
| EP-04 | Recomendacion y aprobacion de distribucion de ayuda | Agrupa las funcionalidades que generan recomendaciones de distribucion y permiten su aprobacion o ajuste por una autoridad responsable. | - | - |
| US-11 | Generar una recomendacion de distribucion | Como autoridad responsable de atender desastres, quiero que el sistema recomiende una distribucion de recursos entre las zonas priorizadas, para tomar decisiones mas rapidas sin exceder el inventario disponible. | **Escenario 1:** Dado que existen zonas priorizadas y recursos disponibles, cuando la autoridad solicita una recomendacion, entonces el sistema genera una propuesta que no excede el inventario disponible.<br><br>**Escenario 2:** Dado que el inventario es insuficiente para cubrir todas las zonas priorizadas, cuando se genera la recomendacion, entonces el sistema indica que zonas quedarian parcial o totalmente desatendidas. | EP-04 |
| US-12 | Aprobar una distribucion recomendada | Como autoridad responsable de atender desastres, quiero aprobar una distribucion recomendada por el sistema, para autorizar su ejecucion bajo mi responsabilidad. | **Escenario 1:** Dado que existe una recomendacion generada, cuando la autoridad la aprueba, entonces la distribucion queda habilitada para su ejecucion y se registra que autoridad la aprobo.<br><br>**Escenario 2:** Dado que una recomendacion ya fue aprobada, cuando se intenta aprobar nuevamente, entonces el sistema indica que ya se encuentra aprobada. | EP-04 |
| EP-05 | Registro y trazabilidad de entregas (Blockchain) | Agrupa las funcionalidades que registran entregas con evidencia, generan respaldo verificable en Blockchain y permiten verificar la integridad de la informacion. | - | - |
| US-15 | Registrar una entrega realizada con evidencia | Como autoridad responsable de atender desastres, quiero registrar una entrega junto con su evidencia, para dejar constancia verificable de lo distribuido. | **Escenario 1:** Dado que una distribucion fue aprobada, cuando la autoridad registra la entrega con su evidencia, entonces el sistema asocia la evidencia a esa entrega y a la zona correspondiente.<br><br>**Escenario 2:** Dado que se intenta registrar una entrega sin evidencia asociada, cuando se confirma el registro, entonces el sistema no permite completarlo. | EP-05 |
| US-16 | Generar un hash verificable de la entrega en Blockchain | Como autoridad responsable de atender desastres, quiero que cada entrega registrada genere un hash verificable en Blockchain, para garantizar que la evidencia no pueda alterarse posteriormente sin detectarse. | **Escenario 1:** Dado que una entrega fue registrada con su evidencia, cuando el sistema procesa el registro, entonces se genera un hash de la evidencia y se almacena en Blockchain.<br><br>**Escenario 2:** Dado que la evidencia original de una entrega es modificada despues del registro, cuando se recalcula su hash, entonces el nuevo hash no coincide con el hash almacenado. | EP-05 |
| US-18 | Excluir datos personales sensibles del registro en Blockchain | Como autoridad responsable de atender desastres, quiero que el sistema impida almacenar datos personales sensibles de la poblacion afectada en Blockchain, para proteger su privacidad conforme a las restricciones del proyecto. | **Escenario 1:** Dado que se registra una entrega con evidencia, cuando el sistema genera el hash a almacenar en Blockchain, entonces solo se incluyen datos no sensibles.<br><br>**Escenario 2:** Dado que un campo del registro contiene informacion personal sensible, cuando el sistema prepara el dato a enviar a Blockchain, entonces dicho campo es excluido antes del envio. | EP-05 |
| EP-06 | Auditoria y exportacion de evidencias | Agrupa las funcionalidades que permiten reconstruir decisiones, consultar historial y sustentar entregas ante procesos de auditoria. | - | - |
| US-20 | Consultar el registro de cambios sobre una zona | Como autoridad responsable de atender desastres, quiero consultar el historial de decisiones tomadas sobre una zona, para reconstruir el proceso seguido ante una revision posterior. | **Escenario 1:** Dado que una zona tuvo decisiones registradas, cuando se consulta su historial, entonces se listan en orden cronologico junto con la autoridad responsable de cada una.<br><br>**Escenario 2:** Dado que ocurre un cambio de turno entre autoridades, cuando el nuevo responsable consulta el historial, entonces puede visualizar todas las decisiones del turno anterior. | EP-06 |
| EP-07 | Gestion de usuarios y accesos | Agrupa las funcionalidades de autenticacion y autorizacion necesarias para proteger acciones criticas segun el rol del usuario. | - | - |
| US-21 | Iniciar sesion con credenciales institucionales | Como autoridad responsable de atender desastres, quiero iniciar sesion en la plataforma con mis credenciales institucionales, para acceder unicamente a la informacion que corresponde a mi rol. | **Escenario 1:** Dado que la autoridad ingresa credenciales validas, cuando el sistema las valida, entonces se concede acceso segun el rol asignado.<br><br>**Escenario 2:** Dado que la autoridad ingresa credenciales invalidas, cuando el sistema las valida, entonces se deniega el acceso sin revelar cual dato fue incorrecto. | EP-07 |
| EP-08 | Portal publico de transparencia para ciudadanos | Agrupa las funcionalidades que permiten consultar informacion publica sobre atencion y entregas sin exponer datos personales sensibles. | - | - |
| US-24 | Consultar el estado de atencion de una zona | Como ciudadano afectado por un desastre, quiero consultar el estado de atencion de mi zona, para saber si ya fue registrada y en que etapa del proceso se encuentra. | **Escenario 1:** Dado que una zona fue registrada, cuando un ciudadano consulta su estado, entonces se muestra la etapa actual del proceso sin exponer informacion sensible de terceros.<br><br>**Escenario 2:** Dado que una zona no ha sido registrada aun, cuando un ciudadano intenta consultarla, entonces el sistema indica que no existe informacion disponible. | EP-08 |
| EP-10 | Plataforma / Infraestructura - APIs | Agrupa las Technical Stories necesarias para exponer mediante RESTful APIs las capacidades centrales del sistema. | - | - |
| TS-01 | API para el registro y consulta de reportes de campo | Como developer, quiero exponer un endpoint RESTful para crear y consultar reportes de campo estructurados, para que el frontend y otros servicios puedan integrarse con el modulo de NLP. | **Escenario 1:** Dado que se envia una solicitud POST con el texto de un reporte valido, cuando el endpoint la procesa, entonces responde con codigo 201 y el reporte estructurado generado.<br><br>**Escenario 2:** Dado que se envia una solicitud POST sin el campo de texto del reporte, cuando el endpoint la procesa, entonces responde con codigo 400 indicando el campo faltante. | EP-10 |
| TS-02 | API para el calculo del score de urgencia | Como developer, quiero exponer un endpoint RESTful que calcule y devuelva el score de urgencia de una zona junto con su explicacion, para integrarlo con los modulos de priorizacion y visualizacion. | **Escenario 1:** Dado que se envia una solicitud GET con el identificador de una zona con variables suficientes, cuando el endpoint la procesa, entonces responde con codigo 200, el score calculado y sus variables explicativas.<br><br>**Escenario 2:** Dado que se envia una solicitud GET con el identificador de una zona inexistente, cuando el endpoint la procesa, entonces responde con codigo 404. | EP-10 |
| TS-04 | API para generar la recomendacion de distribucion | Como developer, quiero exponer un endpoint RESTful que genere la recomendacion de distribucion de recursos entre zonas priorizadas, para integrarlo con el modulo de aprobacion de la autoridad. | **Escenario 1:** Dado que se envia una solicitud POST con las zonas priorizadas y el inventario disponible, cuando el endpoint la procesa, entonces responde con codigo 200 y una propuesta que no excede el inventario recibido.<br><br>**Escenario 2:** Dado que se envia una solicitud POST sin zonas priorizadas, cuando el endpoint la procesa, entonces responde con codigo 400. | EP-10 |
| TS-05 | API para registrar una entrega y su hash en Blockchain | Como developer, quiero exponer un endpoint RESTful que registre una entrega, genere su hash y lo envie a Blockchain, para que el modulo de trazabilidad pueda verificar la evidencia posteriormente. | **Escenario 1:** Dado que se envia una solicitud POST con la evidencia de una entrega valida, cuando el endpoint la procesa, entonces responde con codigo 201, el hash generado y la referencia de la transaccion en Blockchain.<br><br>**Escenario 2:** Dado que se envia una solicitud POST sin evidencia asociada, cuando el endpoint la procesa, entonces responde con codigo 400 y no genera ningun hash. | EP-10 |

### 4.1.2.2. Quality Attribute Scenarios

### 4.1.2.3. Constraints

## 4.1.3. Architectural Drivers Backlog

## 4.1.4. Architectural Design Decisions

## 4.1.5. Quality Attribute Scenario Refinements

## 4.2. Strategic-Level Domain-Driven Design

## 4.2.1. EventStorming

## 4.2.2. Candidate Context Discovery

## 4.2.3. Domain Message Flows Modeling

## 4.2.4. Bounded Context Canvases

## 4.2.5. Context Mapping

## 4.3. Software Architecture

### 4.3.1. Software Architecture System Landscape Diagram

### 4.3.1 / 4.3.2. Software Architecture Context Level Diagram(s)

### 4.3.2 / 4.3.3. Software Architecture Container Level Diagrams

### 4.3.3 / 4.3.4. Software Architecture Deployment Diagrams

---
