# Capítulo I: Introducción

## 1.1. Startup Profile

### 1.1.1. Descripción de la Startup

**Waqta Labs** es una startup tecnológica orientada al desarrollo de soluciones digitales que aplican tecnologías emergentes Inteligencia Artificial y Blockchain para resolver problemas de alto impacto social.

Su primer producto es **Auxilio Inteligente (AuxIA)**, una plataforma orientada al sector de gestión de emergencias y ayuda humanitaria en el Perú. AuxIA atiende la dificultad que enfrentan los responsables de la respuesta ante desastres (huaicos, inundaciones, terremotos) para priorizar qué zonas afectadas deben recibir ayuda primero, distribuir recursos limitados de forma eficiente y mantener un registro trazable y verificable de las entregas realizadas.

La orientación tecnológica e innovadora de Waqta Labs se sustenta en tres pilares: procesamiento de lenguaje natural (NLP) para estructurar reportes de campo, machine learning y optimización para calcular la urgencia de cada zona y recomendar la distribución de recursos, y Blockchain para garantizar la integridad y trazabilidad de cada entrega, manteniendo siempre la aprobación humana como paso final antes de ejecutar cualquier distribución.

### 1.1.2. Perfiles de integrantes del equipo

| Foto del estudiante | Nombres y apellidos | Código de estudiante | Carrera | Descripción |
|---|---|---|---|---|
| ![Iker Barturen](../assets/members/Iker_Barturen.jpeg) | Barturen Panez, Iker Gabriel | U202312629 | Ingeniería de Software | Estudiante de Ingeniería de Software con conocimientos en backend, arquitectura de software, bases de datos, APIs REST, Git/GitHub y Docker. Puedo aportar principalmente en el diseño técnico de la solución, desarrollo backend, integración de servicios, gestión de datos y organización del proyecto. |
| [PENDIENTE] | Castillo Garay, Ainhoa Lucia | u202311701 | Ingeniería de Software | [PENDIENTE] |
| [PENDIENTE] | Nakamurakare Teruya, Alex Tomio | u20201f855 | Ingeniería de Software | [PENDIENTE] |
| [PENDIENTE] | Trillo Hernandez, Anghel Melanie | [PENDIENTE] | Ingeniería de Software | [PENDIENTE] |

## 1.2. Solution Profile

Esta sección presenta el Solution Profile de Waqta Labs. Primero se desarrollan los Antecedentes y Problemática, que consolidan el enunciado del problema, los objetivos y las restricciones del proyecto a partir de la técnica 5W + 2H. Luego se desarrolla el Lean UX Process, que traduce este análisis en el Problem Statement, las Assumptions, las Hypothesis Statements y el Lean UX Canvas del modelo de negocio de Auxilio Inteligente (AuxIA).

### 1.2.1. Antecedentes y problemática

#### Aplicación de la técnica 5W + 2H

**Who (¿Quién?):** responsables de logística humanitaria, autoridades locales y regionales, organizaciones de respuesta ante desastres, personal de campo, organizaciones de ayuda humanitaria, y comunidades y familias afectadas.

**What (¿Qué ocurre?):** durante una emergencia, la información sobre zonas afectadas, población vulnerable y recursos disponibles llega desde distintas fuentes, cambia rápidamente y no está centralizada. Esto dificulta priorizar qué zonas deben recibir ayuda primero, distribuir recursos limitados de forma eficiente y mantener trazabilidad sobre lo que ya fue entregado.

**Where (¿Dónde?):** alcance inicial en Perú, con énfasis en emergencias como huaicos, inundaciones y terremotos, sin limitarse únicamente a Lima Metropolitana.

**When (¿Cuándo?):** durante la respuesta inicial a la emergencia, la evaluación de daños, la asignación y distribución de recursos, y el seguimiento posterior a las entregas realizadas.

**Why (¿Por qué?):** la información se maneja de forma fragmentada entre distintas entidades, existe presión temporal para decidir, los recursos disponibles son limitados frente a la demanda, hay dificultad para actualizar la información en tiempo real, y no existe visibilidad consolidada de las entregas ya realizadas.

**How (¿Cómo se gestiona actualmente?):** en el Perú, la respuesta ante emergencias se organiza a través del Sistema Nacional de Gestión del Riesgo de Desastres (SINAGERD), donde INDECI coordina la respuesta y el COEN centraliza los reportes de las emergencias declaradas, mientras que los gobiernos locales y regionales realizan el levantamiento inicial de información en campo mediante fichas de Evaluación de Daños y Necesidades (EDAN) y el registro correspondiente en el Sistema Nacional de Información para la Respuesta y Rehabilitación (SINPAD). Este proceso se apoya principalmente en reportes escritos y coordinación telefónica o radial entre las distintas entidades, lo que dificulta consolidar rápidamente una vista única del estado de todas las zonas afectadas.

**How Much (¿Qué magnitud tiene?):** el Perú es un país con alta exposición a huaicos, inundaciones y sismos, especialmente durante la temporada de lluvias (diciembre a abril) y en años de eventos como El Niño Costero. A modo de referencia, el Fenómeno de El Niño Costero de 2017 afectó a más de un millón de personas en distintas regiones del país, evidenciando la magnitud que pueden alcanzar estas emergencias y la necesidad de una respuesta mejor coordinada.

#### Enunciado del problema

En el Perú, la respuesta ante emergencias como huaicos, inundaciones y terremotos enfrenta dificultades para priorizar qué zonas afectadas deben recibir ayuda primero, distribuir recursos limitados de forma eficiente entre ellas, y mantener un registro trazable y verificable de las entregas realizadas, debido a que la información proviene de fuentes desconectadas entre sí.

#### Puntos que debe resolver la solución

- Consolidar información proveniente de reportes de campo para conocer el estado real de cada zona afectada.
- Priorizar zonas afectadas según su nivel de urgencia.
- Recomendar una distribución de recursos limitados entre las zonas priorizadas.
- Registrar las entregas realizadas de forma trazable y verificable.

#### Objetivos

- Reducir el tiempo que toma decidir qué zonas deben recibir ayuda primero.
- Evitar la duplicidad o el desatendimiento de zonas afectadas.
- Garantizar que las entregas registradas puedan auditarse posteriormente.

#### Restricciones

- La decisión final sobre la distribución de recursos se mantiene a cargo de una persona responsable; la Inteligencia Artificial solo emite recomendaciones (Decision Support System).
- No se debe almacenar información personal sensible de la población afectada en Blockchain.
- El alcance inicial (MVP) se limita a un escenario de demostración controlado, no a la totalidad de emergencias registradas en el país.

### 1.2.2. Lean UX Process

A partir de los Antecedentes y Problemática, se aplica Lean UX Process sobre el dominio de gestión y distribución de ayuda humanitaria durante emergencias, para definir la visión del modelo de negocio que soportará Auxilio Inteligente (AuxIA): primero el Problem Statement, luego las Assumptions y las Hypothesis Statements, y finalmente el Lean UX Canvas que consolida todo lo anterior.

#### 1.2.2.1. Lean UX Problem Statements

- **Domain:** gestión y distribución de ayuda humanitaria durante emergencias y desastres en el Perú.
- **Customer Segments:** ciudadanos afectados por desastres; autoridades responsables de atender desastres (ver sección 1.3).
- **Pain Points:** dificultad para consolidar información proveniente de distintas fuentes, priorización bajo presión temporal, recursos insuficientes frente a la demanda, poca visibilidad de las entregas ya realizadas, riesgo de duplicidad y dificultad para auditar posteriormente lo entregado.
- **Gap:** no existe una plataforma que centralice la información de campo, sustente la priorización de zonas y registre las entregas de forma verificable.
- **Vision/Strategy:** consolidar la información de campo, apoyar la priorización y distribución de recursos mediante Inteligencia Artificial, y garantizar la trazabilidad de las entregas mediante Blockchain, manteniendo siempre la decisión final en manos de un responsable humano.
- **Initial Segment:** autoridades responsables de atender desastres, por ser quienes interactuarían directamente con la plataforma para priorizar y distribuir recursos (los ciudadanos afectados son beneficiarios de la solución, no necesariamente usuarios directos).

El estado actual de la gestión y distribución de ayuda humanitaria durante emergencias en el Perú ha identificado que las autoridades responsables de atender desastres enfrentan dificultad para priorizar zonas y distribuir recursos limitados con información fragmentada. Esta situación genera decisiones más lentas y menor trazabilidad de lo entregado. Los procesos existentes presentan un vacío: no hay una plataforma que centralice esta información y sustente las decisiones de priorización. Nuestra visión consiste en construir dicha plataforma combinando Inteligencia Artificial y Blockchain, con aprobación humana en cada distribución. Inicialmente nos enfocaremos en las autoridades responsables de atender desastres para validar si contar con una priorización explicada de las zonas afectadas mejora la toma de decisiones.

#### 1.2.2.2. Lean UX Assumptions

**Business Assumptions**

- Existe valor en disponer de una vista consolidada de zonas, necesidades e inventario durante una emergencia.
- La trazabilidad de las entregas puede aportar valor a las autoridades responsables.
- Las recomendaciones automáticas de distribución pueden ayudar a analizar múltiples variables a la vez.

**User Assumptions**

- Las autoridades responsables necesitan identificar rápidamente las zonas más urgentes.
- Las autoridades responsables necesitan conocer qué recursos ya fueron entregados a cada zona.
- Las autoridades responsables necesitan registrar cambios durante el transcurso de una emergencia.

**Technology Assumptions**

- Los reportes de campo redactados en lenguaje natural pueden contener información suficiente para ser procesados con NLP.
- Es posible construir un score de urgencia a partir de variables disponibles sobre cada zona afectada.
- Es posible registrar hashes de las entregas en Blockchain sin almacenar datos personales sensibles de la población afectada.

#### 1.2.2.3. Lean UX Hypothesis Statements

1. Creemos que ofrecer una vista consolidada de zonas, necesidades e inventario para las autoridades responsables logrará decisiones de distribución más rápidas y sustentadas. Sabremos que esto es cierto cuando el tiempo promedio para decidir la distribución de recursos en una emergencia simulada se reduzca en al menos un 30%.
2. Creemos que permitir consultar las entregas previas por zona para las autoridades responsables logrará reducir el riesgo de duplicidad o desatención de zonas. Sabremos que esto es cierto cuando, en un escenario de prueba con múltiples zonas, ninguna reciba ayuda duplicada mientras otra queda sin atender.
3. Creemos que estructurar automáticamente los reportes de campo mediante NLP para las autoridades responsables logrará reducir el tiempo que toma consolidar la información antes de priorizar una zona. Sabremos que esto es cierto cuando el procesamiento de un reporte de campo pase de tomar minutos de revisión manual a segundos de forma automatizada.

#### 1.2.2.4. Lean UX Canvas

> Consolidado en base al Lean UX Canvas v2 de Jeff Gothelf (ver Bibliografía). Esta tabla debe complementarse con la versión visual elaborada en la herramienta indicada por el curso.

| Bloque | Contenido |
|---|---|
| 1. Business Problem | Las autoridades responsables de atender emergencias en el Perú (huaicos, inundaciones, terremotos) no cuentan con una plataforma que centralice la información de las zonas afectadas, priorice su atención y permita verificar la trazabilidad de las entregas realizadas. |
| 2. Business Outcomes | Mejorar la velocidad y el sustento de las decisiones de distribución de recursos durante una emergencia, y garantizar la trazabilidad de las entregas realizadas. |
| 3. Users | Autoridades responsables de atender desastres (segmento inicial); ciudadanos afectados por desastres (beneficiarios). |
| 4. User Outcomes & Benefits | Las autoridades responsables obtienen una vista centralizada y priorizada de las zonas afectadas junto con un registro auditable de las entregas; los ciudadanos afectados se benefician de una respuesta más rápida y mejor distribuida. |
| 5. Solutions | Auxilio Inteligente (AuxIA): plataforma que procesa reportes de campo con NLP, calcula un score de urgencia por zona con Machine Learning, recomienda la distribución de recursos mediante optimización, y registra cada entrega en Blockchain, siempre con aprobación humana final. |
| 6. Hypotheses | Ver Lean UX Hypothesis Statements (sección 1.2.2.3). |
| 7. ¿Qué es lo más importante que necesitamos aprender primero? | Si las autoridades responsables toman decisiones más rápidas y sustentadas al contar con una priorización explicada de las zonas afectadas. |
| 8. ¿Cuál es el mínimo trabajo necesario para aprenderlo? | Entrevistas y demostración de un prototipo de ranking de zonas priorizadas con autoridades del segmento inicial, sin necesidad de implementar aún el módulo de Blockchain ni un modelo de Machine Learning entrenado. |

## 1.3. Segmentos objetivo

#### Segmento 1: Ciudadanos afectados por desastres

**Descripción:** personas y familias que residen en zonas expuestas a huaicos, inundaciones o terremotos en el Perú, y que requieren asistencia humanitaria (agua, alimentos, abrigo, atención médica) durante y después de una emergencia.

**Características demográficas:** familias de distintos niveles socioeconómicos, con mayor incidencia en zonas periurbanas y rurales ubicadas en laderas, quebradas o riberas de ríos; el grupo incluye niños, adultos mayores y personas con discapacidad como poblaciones de especial atención.

**Necesidades generales:** recibir ayuda de forma oportuna, saber si su zona ya fue atendida, y tener certeza sobre qué recursos les corresponden.

**Características relevantes para el dominio:** suelen encontrarse en situación de vulnerabilidad y con acceso limitado a conectividad durante la emergencia, lo que dificulta que reporten directamente su situación y dependen de terceros (autoridades, personal de campo) para ser atendidos.

**Información estadística:** este segmento representa a la población más expuesta ante huaicos, inundaciones y sismos en el país; como referencia, el Fenómeno de El Niño Costero de 2017 afectó a más de un millón de personas en distintas regiones del Perú.

#### Segmento 2: Autoridades responsables de atender desastres

**Descripción:** personal de instituciones encargadas de coordinar la respuesta ante emergencias (por ejemplo, gobiernos locales/regionales y organismos de gestión de riesgo de desastres), que debe decidir cómo priorizar zonas y distribuir recursos limitados.

**Características demográficas:** personal técnico y funcionarios de gobiernos locales y regionales, así como de organismos como INDECI y las Plataformas de Defensa Civil, generalmente con formación en gestión de riesgos, ingeniería o administración pública.

**Necesidades generales:** contar con información centralizada y actualizada de las zonas afectadas, priorizar la distribución de recursos de forma sustentada, y mantener un registro auditable de las entregas realizadas.

**Características relevantes para el dominio:** opera bajo presión temporal y con recursos limitados, y debe responder ante organismos superiores por las decisiones tomadas.

**Información estadística:** el Perú cuenta con más de 1,800 gobiernos locales y 25 gobiernos regionales integrados al Sistema Nacional de Gestión del Riesgo de Desastres (SINAGERD), cada uno con responsabilidad directa sobre la atención de emergencias en su jurisdicción.

---
