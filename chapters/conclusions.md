# Conclusiones

## Conclusiones y recomendaciones

*Avance correspondiente a la entrega TP1. Esta sección se irá expandiendo con los resultados obtenidos en TB2 y TF1, conforme el equipo cuente con evidencia de implementación, despliegue y validación de los productos digitales.*

El Problem Statement definido en el Capítulo I planteaba que las autoridades responsables de atender desastres enfrentan dificultades para priorizar zonas afectadas y distribuir recursos limitados cuando la información de campo llega fragmentada, cambia rápidamente o no está conectada con el inventario y las entregas previas. El proceso de Requirements Elicitation & Analysis desarrollado en el Capítulo II confirma este planteamiento: las entrevistas registradas evidenciaron que tanto ciudadanos como autoridades dependen de canales informales (WhatsApp, radio, papel) para reportar y coordinar la ayuda, y que la falta de una fuente única de información genera duplicidad de entregas, pérdida de trazabilidad entre turnos y desconfianza sobre si una zona ya fue atendida.

En TP1 ese problema se tradujo en diseño. El Capítulo V separa la solución en cinco bounded contexts. Emergency Management concentra la priorización de zonas y los planes de distribución. Resource Management controla el inventario. Traceability registra las entregas con evidencia. Identity Access gestiona el acceso por organización y rol. Citizen Transparency publica el estado de cada zona sin exponer datos internos. El Capítulo VI lleva esas capacidades a la Landing Page, al Centro de Mando web y a la aplicación móvil.

Respecto a las Assumptions planteadas en el Lean UX Process, el avance permite el siguiente contraste:

- La **Business Assumption** sobre el valor de una vista consolidada de zonas, necesidades e inventario sigue respaldada por las entrevistas a autoridades, que señalaron la falta de una sola fuente de verdad. En el diseño, esa vista corresponde al Dashboard y al Mapa GIS del Centro de Mando, alimentados por Emergency Management y Resource Management.
- Las **User Assumptions** sobre la necesidad de las autoridades de identificar rápidamente zonas urgentes y conocer entregas previas por zona coinciden con las tareas de mayor frecuencia e importancia del User Task Matrix (Capítulo II). El Capítulo VI responde a ellas con la bandeja de priorización, que explica cada Urgency Score, y con la Consulta pública, que muestra a los ciudadanos las entregas realizadas en su zona. Estas pantallas existen como prototipos, pero todavía no se han probado con usuarios.
- Las **Technology Assumptions** sobre estructurar reportes de campo mediante NLP y registrar hashes en Blockchain sin datos personales ya tienen una forma concreta en el diseño táctico. Emergency Management se comunica con el AI Service a través de un Anti-Corruption Layer, de modo que un cambio en el modelo de NLP solo afecta a ese adaptador. Traceability calcula el hash sobre un registro de la entrega que no contiene datos personales y envía a Blockchain solo ese hash (TS-C02). Ninguna de estas decisiones está validada técnicamente; su comprobación ocurrirá durante la implementación y las pruebas del Capítulo VII.

Las Hypothesis Statements definidas en el Capítulo I (reducción del tiempo de decisión en al menos 30%, cero duplicidad o desatención de zonas en un escenario de prueba, y procesamiento de reportes de minutos a segundos) aún no pueden evaluarse, porque a la fecha de esta entrega no existe una versión desplegada del producto ni datos de ejecución. Los prototipos interactivos de la sección 6.5 permiten preparar las primeras sesiones de validación, aunque las métricas de tiempo y duplicidad solo podrán medirse con el producto implementado.

Como siguientes pasos para TB2, el equipo prioriza tres frentes. Primero, implementar y desplegar en el Sprint 1 la Landing Page y los primeros endpoints del Backend API, siguiendo el orden del Product Backlog de la sección 3.4. Segundo, realizar entrevistas de validación con representantes de ambos segmentos sobre la Landing Page y los prototipos, aplicando la evaluación heurística de la sección 7.3. Tercero, publicar las primeras versiones de los videos About-the-Product y About-the-Team.

## Video About-the-Team

*El video About-the-Team se publicará en la entrega TB2, junto con la primera versión desplegada de los productos digitales, siguiendo las indicaciones del Anexo C del Statement.*
