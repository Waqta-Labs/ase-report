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

**Who (¿Quién?):** actores candidatos a investigar en el Capítulo II: responsables de logística humanitaria, autoridades locales y regionales, organizaciones de respuesta ante desastres, personal de campo, organizaciones de ayuda humanitaria, y comunidades y familias afectadas.

**What (¿Qué ocurre?):** durante una emergencia, la información sobre zonas afectadas, población vulnerable y recursos disponibles llega desde distintas fuentes, cambia rápidamente y no está centralizada. Esto dificulta priorizar qué zonas deben recibir ayuda primero, distribuir recursos limitados de forma eficiente y mantener trazabilidad sobre lo que ya fue entregado.

**Where (¿Dónde?):** alcance inicial en Perú, con énfasis en emergencias como huaicos, inundaciones y terremotos, sin limitarse únicamente a Lima Metropolitana.

**When (¿Cuándo?):** durante la respuesta inicial a la emergencia, la evaluación de daños, la asignación y distribución de recursos, y el seguimiento posterior a las entregas realizadas.

**Why (¿Por qué?):** hipótesis preliminares por validar: la información se maneja de forma fragmentada entre distintas entidades, existe presión temporal para decidir, los recursos disponibles son limitados frente a la demanda, hay dificultad para actualizar la información en tiempo real, y no existe visibilidad consolidada de las entregas ya realizadas.

**How (¿Cómo se gestiona actualmente?):** [PENDIENTE: describir el proceso actual de evaluación de daños y necesidades en el Perú, en base a fuentes oficiales como INDECI, COEN y SINPAD].

**How Much (¿Qué magnitud tiene?):** [PENDIENTE: incorporar estadísticas oficiales sobre emergencias registradas, personas afectadas y damnificadas, con año y fuente (INDECI, SINPAD, INEI, EM-DAT)].

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

#### 1.2.2.1. Lean UX Problem Statements

#### 1.2.2.2. Lean UX Assumptions

#### 1.2.2.3. Lean UX Hypothesis Statements

#### 1.2.2.4. Lean UX Canvas

## 1.3. Segmentos objetivo

#### Segmento 1: Ciudadanos afectados por desastres

**Descripción:** personas y familias que residen en zonas expuestas a huaicos, inundaciones o terremotos en el Perú, y que requieren asistencia humanitaria (agua, alimentos, abrigo, atención médica) durante y después de una emergencia.

**Características demográficas:** [PENDIENTE: edad, distrito/región, nivel socioeconómico — a definir tras el proceso de entrevistas del Capítulo II].

**Necesidades generales:** recibir ayuda de forma oportuna, saber si su zona ya fue atendida, y tener certeza sobre qué recursos les corresponden.

**Características relevantes para el dominio:** pueden encontrarse en situación de vulnerabilidad (niños, adultos mayores, personas con discapacidad) y con acceso limitado a conectividad durante la emergencia.

**Información estadística:** [PENDIENTE: incorporar cifras oficiales de personas afectadas/damnificadas por tipo de desastre, con año y fuente (INDECI, SINPAD, INEI, EM-DAT)].

#### Segmento 2: Autoridades responsables de atender desastres

**Descripción:** personal de instituciones encargadas de coordinar la respuesta ante emergencias (por ejemplo, gobiernos locales/regionales y organismos de gestión de riesgo de desastres), que debe decidir cómo priorizar zonas y distribuir recursos limitados.

**Características demográficas:** [PENDIENTE: perfil profesional y de cargo — a definir tras el proceso de entrevistas del Capítulo II].

**Necesidades generales:** contar con información centralizada y actualizada de las zonas afectadas, priorizar la distribución de recursos de forma sustentada, y mantener un registro auditable de las entregas realizadas.

**Características relevantes para el dominio:** opera bajo presión temporal y con recursos limitados, y debe responder ante organismos superiores por las decisiones tomadas.

**Información estadística:** [PENDIENTE: incorporar cifras oficiales sobre instituciones/organismos involucrados en la gestión de riesgo de desastres en el Perú].

---
