# Conclusiones

## Conclusiones y recomendaciones

El Problem Statement del Capítulo I planteaba que las autoridades responsables de atender desastres tienen dificultades para priorizar zonas afectadas y distribuir recursos limitados cuando la información de campo llega fragmentada, cambia rápidamente o no está conectada con el inventario ni con las entregas previas. Las entrevistas del Capítulo II confirmaron ese planteamiento. Ciudadanos y autoridades reportan y coordinan la ayuda por WhatsApp, radio o papel. Sin una fuente única de información, las entregas se duplican, la trazabilidad se pierde entre turnos y nadie está seguro de si una zona ya fue atendida.

A lo largo del ciclo de vida, el equipo convirtió ese problema en productos desplegados:

- **Diseño (TP1).** El Capítulo V separó la solución en cinco bounded contexts: Emergency Management, Resource Management, Traceability, Identity Access y Citizen Transparency. El Capítulo VI llevó esas capacidades a la Landing Page, al Centro de Mando web y a la aplicación móvil.
- **Sprint 1 (TB2).** Se desplegaron el Backend API, el AI Service, el smart contract `DeliveryRegistry` en Sepolia, la Landing Page y la aplicación móvil.
- **Sprint 2.** En la primera parte se desplegó la Web App. En la segunda, después de las seis entrevistas de validación y la evaluación heurística de la sección 7.3, se corrigieron los tres problemas de severidad 3 y otros tres de severidad 1 y 2. Esas correcciones se publicaron como el Backend API 0.2.0, una nueva versión de la Web App y la aplicación móvil 0.2.0 (sección 7.2.2).

Al cierre del proyecto, la pregunta del Capítulo I tiene una respuesta funcional en los productos desplegados, aunque todavía no medida. Una autoridad puede ver en un solo Centro de Mando las zonas ordenadas por Urgency Score, el inventario y las brigadas, y aprobar o rechazar el plan de distribución que recomienda el sistema. Después puede comprobar que cada entrega quedó registrada sin que nadie la haya modificado.

### Assumptions frente al comportamiento de los segmentos

- **Business Assumptions.** Las entrevistas a autoridades respaldan el valor de una vista consolidada de zonas, necesidades e inventario, porque señalaron la falta de una sola fuente de verdad. La trazabilidad también aporta valor, con una condición: la pantalla tiene que decir qué prueba. Daniel Ortega la entendió como un registro que permite comprobar que la ayuda fue entregada y que nadie puede modificar. Fabricio Contreras, en cambio, se perdió con los hashes y los códigos. Por eso, en el Sprint 2, la ficha de una entrega pasó a decir en palabras si fue comprobada, y los hashes quedaron como detalle técnico. La tercera Business Assumption, que las recomendaciones automáticas ayudan a analizar varias variables a la vez, se cumplió en parte. Daniel considera suficientes los factores que explican el score para justificar por qué se atiende una zona antes que otra. Sin embargo, la evaluación heurística registró que el detalle de la zona no da una recomendación clara de qué hacer (problema #3 de la Web App), y esa recomendación sigue pendiente.
- **User Assumptions.** La necesidad de identificar rápido las zonas urgentes y de conocer las entregas previas coincide con las tareas de mayor frecuencia e importancia del User Task Matrix. La validación reveló necesidades que las Assumptions no anticipaban. Las autoridades pidieron ver el estado de las vías de acceso, y la Web App ahora muestra las condiciones que reportan los ciudadanos y una capa de vías bloqueadas en el Mapa GIS. Del lado ciudadano, los entrevistados entendieron el SOS sin explicación, pero ninguno supo si alguien atendió su pedido. Por eso el SOS ahora pasa a "Aceptado por el centro de mando", con la hora, cuando una autoridad aprueba el plan de su zona.
- **Technology Assumptions.** Las tres se comprobaron técnicamente en el entorno desplegado:
  - El AI Service estructura los reportes de campo y calcula el score con reglas explícitas (`rules-v1`).
  - Emergency Management lo consume a través de un Anti-Corruption Layer, y el backend sigue funcionando cuando el servicio no responde.
  - Traceability envía a Sepolia solo el hash de un registro sin datos personales (TS-C02), y la verificación pública recalcula ese hash desde PostgreSQL para compararlo con el guardado en la cadena.

  Lo que la validación cuestionó fue la forma de comunicar estos mecanismos. Además de lo que le pasó a Fabricio en la Web App, Tatiana Nakamurakare entendió "Validado e Inmutable en Blockchain" como un registro de sus misiones, no como la prueba de que la ayuda llegó. La aplicación del brigadista ahora confirma "Entrega registrada · misión completada" y explica qué garantiza el registro.

### Hypothesis Statements y criterios de éxito

Las tres Hypothesis Statements del Capítulo I terminan el proyecto sin un resultado medido. Sus criterios de éxito eran:

1. Reducir en al menos 30 % el tiempo de decisión en una emergencia simulada.
2. Que ninguna zona reciba ayuda duplicada mientras otra queda sin atender.
3. Que el procesamiento de un reporte pase de minutos a segundos.

Las entrevistas de validación fueron sesiones guiadas. Confirman que los usuarios entienden el flujo, pero no miden tiempos ni duplicidad, y el equipo no ejecutó el escenario de prueba controlado que esas mediciones requieren. Por eso el informe no puede afirmar que las hipótesis se cumplen ni que se refutan.

Los productos sí dejan lista la medición. El backend guarda cuándo llega cada reporte, cuándo se calculó el score de su zona y cuándo se aprobó cada plan. Además, cada entrega queda asociada a su zona y a su plan. Con esos datos, el tiempo de decisión y la duplicidad se pueden calcular sin instrumentar nada nuevo.

### Recomendaciones para el Roadmap

1. **Medir las hipótesis.** El siguiente paso es una emergencia simulada con varias zonas y autoridades reales, comparada con el proceso actual en papel y WhatsApp. Se debe medir el tiempo desde que llegan los reportes hasta que se aprueba el plan, y contar las zonas atendidas dos veces o no atendidas. Con esos resultados se confirma o se corrige la propuesta de valor antes de ofrecer AuxIA a una municipalidad.
2. **Validar de nuevo las pantallas corregidas.** Las correcciones del Sprint 2 salen de la evaluación heurística, pero ningún entrevistado las ha usado todavía. Conviene repetir las sesiones con los mismos segmentos y comprobar que el SOS aceptado, el plan sin brigada y la confirmación de la entrega se entienden sin explicación.
3. **Resolver los problemas pendientes de la evaluación heurística.** En la aplicación móvil quedan los problemas #2 (escala del score), #3 (canales Mesh y Satélite en rojo), #4 (una sola categoría de ayuda), #5 (avisos sin vibración ni notificación), #9 (registro sin verificación) y #10 (sin campo libre). En la Web App quedan el #3 (recomendación de qué hacer en una zona), el #4 (inventario de solo lectura sin explicación) y el #6 (guía para el primer uso). Los dos más urgentes son el #5 y el #9:
   - Sin notificaciones, el ciudadano no se entera del avance de su pedido si no tiene la aplicación abierta.
   - Un registro sin verificación permite alertas falsas, que le quitarían prioridad a los pedidos reales.
4. **Preparar los productos para un piloto.** Antes de un uso real faltan tres cambios:
   - **Firma de la aplicación móvil.** Se debe firmar con una clave de publicación propia. La versión 0.2.0 obligó a desinstalar la 0.1.0 porque las dos usan claves de depuración distintas.
   - **Base de datos.** La base de datos de Neon no debe suspenderse en los periodos sin uso. Hoy se suspende, y la primera petición después de una pausa tarda unos segundos.
   - **Red Blockchain.** Hay que evaluar el paso de Sepolia, que es una red de prueba, a una red donde el registro tenga validez para auditorías.
