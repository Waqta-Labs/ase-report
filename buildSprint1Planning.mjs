// Genera las secciones 7.2.1.1 (Sprint Planning 1) y 7.2.1.2 (Sprint Backlog 1) del capítulo VII.
// Sprint 1 = Landing Page + Backend API (con AI Service y smart contract) + aplicación móvil.
// Uso:  node buildSprint1Planning.mjs [<ruta/chapter7.md>] [--dry]
// Se puede repetir: siempre vuelve a generar el contenido entre "## 7.2.1.1." y "## 7.2.1.3." (borra lo que hayas editado a mano ahí).
import fs from 'node:fs';

// ═══ COMPLETA ESTOS DATOS ANTES DE EJECUTAR (lo que no esté lo escribe como "Por completar" / "Por asignar") ═══
const PLANNING_DATE = '2026-10-26';             // el Sprint empezó el 26/10/2026 (primer commit de los repositorios)
const PLANNING_TIME = '';                       // ej. '07:00 PM'
const LOCATION = '';                            // ej. 'Reunión virtual por Google Meet'
const PREPARED_BY = 'Castillo Garay, Ainhoa Lucia';
const ATTENDEES = ['Barturen Panez, Iker Gabriel', 'Castillo Garay, Ainhoa Lucia', 'Nakamurakare Teruya, Alex Tomio', 'Trillo Hernandez, Anghel Melanie'];
// Quién desarrolló cada producto (se usa en la columna "Assigned To"). Puedes poner varios nombres: 'Nombre A / Nombre B'.
const ASSIGNEES = { backend: '', ai: '', contract: '', landing: '', mobile: '' };
const HOURS_PER_STORY_POINT = 2;                // las horas de cada historia = Story Points x este valor, repartidas entre sus tasks
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════

const AREA = { backend: 'Backend API', ai: 'AI Service', contract: 'Smart contract', landing: 'Landing Page', mobile: 'App móvil' };

// [id, título, story points, [[título del task, descripción, área], ...]] en el orden del Product Backlog (sección 3.4)
const STORIES = [
  ['US-27', 'Conocer la propuesta de valor de AuxIA', 2, [
    ['Construir el hero y la propuesta de valor', 'Desarrolla el encabezado y la sección principal responsive que explica qué es AuxIA y qué problema resuelve, según el mock-up L_01 del capítulo VI.', 'landing']]],
  ['US-01', 'Registrar un reporte de campo en lenguaje natural', 5, [
    ['Modelar el reporte de campo con zona pendiente', 'Crea el aggregate FieldReport, que puede quedar pendiente de asignar a una zona, y su persistencia con JPA y las migraciones de Flyway.', 'backend'],
    ['Exponer el registro de reportes de campo', 'Agrega los endpoints para registrar un reporte de una zona conocida o de una emergencia, con validaciones y errores RFC 9457.', 'backend'],
    ['Construir el SOS de un toque y el detalle de emergencia', 'Implementa en la app las pantallas A_03 y A_04: botón SOS con GPS, personas afectadas, estado del acceso, foto y audio de 5 segundos.', 'mobile']]],
  ['TS-01', 'API para el registro y consulta de reportes de campo', 3, [
    ['Exponer la consulta de reportes de campo', 'Publica los endpoints GET de reportes estructurados por zona y por emergencia, y el endpoint público de SOS ciudadano (POST y GET /public/field-reports).', 'backend']]],
  ['US-02', 'Extraer automáticamente variables clave de un reporte', 8, [
    ['Extraer variables con el extractor rules-v1', 'Implementa en el AI Service la lectura de daños, familias, personas, grupos vulnerables y necesidades de un reporte en español, en POST /field-reports/structure.', 'ai'],
    ['Estructurar el reporte al registrarlo', 'Implementa la Anti-Corruption Layer hacia el AI Service y guarda los datos estructurados en el reporte mediante eventos de dominio.', 'backend']]],
  ['US-04', 'Calcular el score de urgencia de una zona', 8, [
    ['Calcular el score con reglas ponderadas', 'Implementa en el AI Service el score rules-v1: suma ponderada de nivel de daño, población afectada, población vulnerable y necesidades.', 'ai'],
    ['Guardar y recalcular el score de cada zona', 'Guarda el UrgencyScore con su nivel de prioridad y versión del modelo, y lo recalcula al registrar una zona o un reporte.', 'backend']]],
  ['TS-02', 'API para el cálculo del score de urgencia', 5, [
    ['Exponer el endpoint del score en el AI Service', 'Publica POST /urgency-scores con su esquema de entrada y salida, autenticado con X-API-Key.', 'ai'],
    ['Exponer el score y el ranking de zonas', 'Agrega los endpoints de score por zona y de ranking de la emergencia en el Backend API.', 'backend']]],
  ['US-05', 'Visualizar la explicación del score de una zona', 3, [
    ['Devolver las variables que explican el score', 'Incluye en la respuesta los topFeatures con los puntos que aportó cada variable y exporta el reporte de la zona en PDF (GET /zones/{id}/report).', 'backend']]],
  ['US-06', 'Ordenar y filtrar zonas según score de urgencia', 3, [
    ['Ordenar y filtrar el ranking de zonas', 'Permite listar las zonas por score y filtrar por rango de score o por necesidad, con un orden estable de las necesidades.', 'backend']]],
  ['US-09', 'Consultar el inventario disponible', 3, [
    ['Consultar el inventario disponible y reservado', 'Agrega la consulta del inventario por organización con el stock disponible y reservado de cada recurso y el filtro por categoría.', 'backend']]],
  ['US-08', 'Registrar ingreso de recursos al inventario', 3, [
    ['Registrar y reponer recursos', 'Implementa el aggregate Inventory con su persistencia y los casos de uso para registrar un recurso y reponerlo.', 'backend']]],
  ['TS-03', 'API para consulta y actualización de inventario', 3, [
    ['Exponer los endpoints del inventario', 'Publica los endpoints para crear el inventario, consultarlo, registrar recursos, reponer y ajustar el stock con un motivo.', 'backend']]],
  ['US-11', 'Generar una recomendación de distribución', 8, [
    ['Recomendar la distribución con reglas proporcionales', 'Implementa en el AI Service el reparto rules-v1 de cada recurso entre las zonas priorizadas, sin exceder el inventario, con su cobertura y justificación.', 'ai'],
    ['Generar los planes de distribución y reservar el stock', 'Implementa el aggregate DistributionPlan, la integración con el AI Service y la reserva del stock en la misma transacción.', 'backend']]],
  ['TS-04', 'API para generar la recomendación de distribución', 5, [
    ['Exponer la recomendación de distribución', 'Publica POST /distribution-recommendations en el AI Service y POST /emergencies/{id}/distribution-plans en el Backend API, con las zonas sin atender o atendidas parcialmente.', 'backend']]],
  ['US-12', 'Aprobar una distribución recomendada', 3, [
    ['Aprobar el plan y asignar la brigada más cercana', 'Implementa la aprobación por una autoridad y la sugerencia de la brigada disponible más cercana a la zona (endpoint del AI Service y asignación automática).', 'backend']]],
  ['US-13', 'Modificar una distribución recomendada', 5, [
    ['Modificar las cantidades de un plan', 'Permite cambiar las líneas de la reserva activa antes de aprobar el plan y guarda quién lo cambió, cuándo y por qué.', 'backend']]],
  ['US-15', 'Registrar una entrega realizada con evidencia', 5, [
    ['Registrar la entrega con su evidencia', 'Implementa el aggregate Delivery, el guardado de la foto en Azure Blob Storage, el consumo del stock y el cierre del plan.', 'backend'],
    ['Construir la verificación de entrega en la app', 'Implementa la pantalla A_08: lectura del QR o código manual, firma, registro en cola local y seguimiento del anclaje.', 'mobile']]],
  ['US-16', 'Generar un hash verificable de la entrega en Blockchain', 8, [
    ['Programar el contrato DeliveryRegistry', 'Escribe en Solidity el contrato que registra el hash SHA-256 de cada entrega bajo su UUID, con sus 13 pruebas en Hardhat.', 'contract'],
    ['Desplegar y verificar el contrato en Sepolia', 'Configura la red Sepolia, despliega el contrato y verifica su código en Etherscan.', 'contract'],
    ['Anclar el hash de cada entrega', 'Calcula el hash SHA-256 del registro canónico y lo envía al contrato con Web3j, con reintentos de los anclajes pendientes.', 'backend']]],
  ['TS-05', 'API para registrar una entrega y su hash en Blockchain', 5, [
    ['Exponer el endpoint de registro de entregas', 'Publica el endpoint que registra una entrega, genera su hash y lo ancla, y responde con el estado del anclaje.', 'backend']]],
  ['US-18', 'Excluir datos personales sensibles del registro en Blockchain', 3, [
    ['Excluir los datos personales del registro canónico', 'Define el CanonicalDeliveryRecord, que solo incluye identificadores, recursos y hashes, y nunca datos personales de la población.', 'backend']]],
  ['US-17', 'Consultar el estado de verificación de una entrega', 3, [
    ['Comparar el hash de la entrega con la cadena', 'Agrega la consulta que compara el hash guardado con el registrado en Sepolia y responde su estado de verificación.', 'backend']]],
  ['US-24', 'Consultar el estado de atención de una zona', 3, [
    ['Publicar el estado de atención de cada zona', 'Crea el contexto Citizen Transparency, con modelos de lectura proyectados desde eventos y endpoints públicos con caché de 60 segundos.', 'backend'],
    ['Construir la pantalla Mis reportes', 'Implementa la pantalla A_05 con el estado de cada SOS, la etapa del reporte y el seguimiento periódico de su avance.', 'mobile']]],
  ['US-26', 'Verificar la validez pública de una entrega mediante su código', 3, [
    ['Verificar una entrega por su código público', 'Agrega el endpoint público que valida una entrega a partir de su código, sin exponer datos sensibles.', 'backend']]],
  ['US-25', 'Consultar el historial de entregas realizadas en una zona', 3, [
    ['Consultar el historial público de entregas', 'Agrega el endpoint público con el historial de entregas de una zona y su estado de verificación.', 'backend']]],
  ['US-29', 'Conocer cómo funciona la trazabilidad de la ayuda', 2, [
    ['Construir la sección del flujo del proceso', 'Desarrolla la sección que explica cómo la trazabilidad con Blockchain verifica cada entrega, según el mock-up L_03.', 'landing']]],
  ['US-03', 'Corregir manualmente un reporte estructurado', 3, [
    ['Corregir los indicadores de un reporte', 'Permite corregir o completar los indicadores con un motivo, conserva los valores originales del NLP y usa los corregidos para el score.', 'backend']]],
  ['US-07', 'Ajustar manualmente la prioridad de una zona', 3, [
    ['Priorizar una zona manualmente', 'Agrega la prioridad manual de una zona y la guarda en su historial de decisiones.', 'backend']]],
  ['US-14', 'Justificar el rechazo o modificación de una recomendación', 2, [
    ['Registrar la justificación de una decisión', 'Exige y guarda el motivo al rechazar un plan o modificar sus cantidades.', 'backend']]],
  ['US-10', 'Recibir alerta de inventario bajo', 3, [
    ['Generar alertas de stock bajo', 'Evalúa cada cambio de stock y abre una alerta cuando un recurso queda bajo su mínimo; la resuelve al reponerlo y la envía por correo a los administradores.', 'backend']]],
  ['US-19', 'Exportar el historial de entregas de una zona o periodo', 5, [
    ['Exportar las entregas en PDF', 'Genera el PDF de auditoría con las entregas de una zona o periodo, sus recursos, hash, transacción y estado de verificación.', 'backend']]],
  ['US-20', 'Consultar el registro de cambios sobre una zona', 3, [
    ['Guardar el historial de decisiones de cada zona', 'Registra cada decisión de una autoridad en un historial de solo agregación y lo expone en GET /zones/{id}/history.', 'backend']]],
  ['US-28', 'Conocer la magnitud de la problemática atendida', 1, [
    ['Construir la sección de indicadores de impacto', 'Desarrolla la sección con las cifras de la magnitud del problema, según el mock-up L_02.', 'landing']]],
  ['US-30', 'Conocer las funcionalidades para autoridades', 2, [
    ['Construir la sección de módulos para autoridades', 'Desarrolla la sección de módulos clave y de funcionalidades para las autoridades, según el mock-up L_02.', 'landing']]],
  ['US-33', 'Exportar reportes en formato compatible con SINPAD', 5, [
    ['Exportar reportes de campo en formato SINPAD', 'Genera el archivo de reportes de campo con las filas y validaciones del formato de SINPAD.', 'backend'],
    ['Integrar el envío a SINPAD con un simulador', 'Agrega el simulador de SINPAD y el envío por HTTP mediante una Anti-Corruption Layer, que devuelve el número de registro.', 'backend']]],
  ['US-35', 'Registrar reportes y entregas sin conexión a internet', 8, [
    ['Guardar los datos en una base local cifrada', 'Implementa la base SQLCipher de la app y el perfil local guardado en el almacenamiento seguro del teléfono.', 'mobile'],
    ['Construir la bandeja de salida y la sincronización', 'Implementa el outbox y el motor que envía los reportes y entregas al recuperar la conexión, con reintentos tras un límite de tasa.', 'mobile'],
    ['Mostrar la conectividad y administrar los mapas sin conexión', 'Muestra el estado de la red y de la sincronización, descarga regiones del mapa y completa la pantalla Red y almacenamiento (A_06).', 'mobile']]],
  ['US-21', 'Iniciar sesión con credenciales institucionales', 3, [
    ['Autenticar con JWT y bloquear tras intentos fallidos', 'Implementa POST /auth/sign-in con tokens JWT y bloqueo de la cuenta tras cinco intentos fallidos seguidos.', 'backend'],
    ['Construir el inicio de sesión del brigadista', 'Implementa la pantalla A_10 y la sesión del brigadista, y la lectura de sus misiones desde GET /me/missions.', 'mobile']]],
  ['US-22', 'Asignar roles y permisos según responsabilidad', 3, [
    ['Aplicar roles y permisos a la API', 'Protege cada endpoint con el rol del usuario y permite a un administrador de organización gestionar los usuarios de su organización.', 'backend'],
    ['Registrar brigadistas con aprobación', 'Implementa el registro de brigadistas desde la app (A_02) y su aprobación o rechazo por un administrador de la organización.', 'mobile']]],
  ['US-23', 'Registrar el cambio de turno entre responsables', 3, [
    ['Registrar el cambio de turno', 'Agrega el traspaso de las zonas en curso al siguiente responsable y lo guarda en el historial de la zona.', 'backend']]],
];

// Tasks que no dependen de una historia: configuración, despliegue y calidad. [título, descripción, área, horas]
const GENERAL = [
  ['Configurar el proyecto del Backend API', 'Crea el proyecto Spring Boot 4.1.2 con Maven, perfiles dev y prod, actuator, documentación OpenAPI con Swagger UI, mensajes en en_US y es_419 y manejo de errores RFC 9457.', 'backend', 8],
  ['Diseñar la base de datos con Flyway', 'Define los cinco schemas de los bounded contexts en PostgreSQL y las migraciones versionadas.', 'backend', 6],
  ['Gestionar brigadas y misiones', 'Implementa el aggregate Brigade con sus miembros, disponibilidad y asignaciones, y el endpoint GET /me/missions para la app.', 'backend', 6],
  ['Enviar notificaciones por correo', 'Envía por SMTP, en HTML con la identidad de AuxIA, los avisos de stock bajo, plan aprobado y entrega certificada.', 'backend', 5],
  ['Permitir los orígenes de la Web App (CORS)', 'Configura CORS para que la Web App pueda llamar a la API desde el navegador.', 'backend', 1],
  ['Reducir el consumo de la base cuando la API está inactiva', 'Cierra las conexiones ociosas y detiene el reintento de anclajes cuando no hay pendientes, para que Neon suspenda la base.', 'backend', 2],
  ['Escribir las pruebas del Backend API', 'Escribe 95 clases de pruebas unitarias y de integración (JUnit y Testcontainers) y 31 archivos .feature con 64 escenarios de aceptación (Cucumber).', 'backend', 16],
  ['Desplegar el Backend API en Azure', 'Crea la base en Neon, la cuenta de Azure Blob Storage y el App Service, registra las variables de entorno y publica las versiones 0.1.0 y 0.1.1.', 'backend', 6],
  ['Configurar el proyecto del AI Service', 'Crea el proyecto FastAPI con dependencias fijas, esquemas comunes, manejo de errores, validación de X-API-Key y el endpoint /health.', 'ai', 4],
  ['Escribir las pruebas del AI Service', 'Escribe 87 pruebas con pytest en 12 archivos para los extractores, el score, la distribución y la sugerencia de brigada.', 'ai', 6],
  ['Desplegar el AI Service en Azure', 'Crea el App Service de Python con el comando de inicio y la variable AI_SERVICE_API_KEY.', 'ai', 2],
  ['Configurar el proyecto del smart contract', 'Crea el proyecto Hardhat 3 con OpenZeppelin y documenta el despliegue.', 'contract', 3],
  ['Configurar el proyecto de la app móvil', 'Crea el proyecto Flutter con el sistema de diseño, el cliente de la API, la localización es/en, la navegación por rol y el flujo de CI en GitHub Actions.', 'mobile', 8],
  ['Construir el registro y la selección de rol', 'Implementa la pantalla A_01 y la credencial de brigadista pendiente de aprobación.', 'mobile', 4],
  ['Escribir las pruebas de la app móvil', 'Escribe 31 archivos de pruebas de dominio, gateways, base local, sincronización, cubits, pantallas y accesibilidad.', 'mobile', 10],
  ['Corregir los problemas de la prueba de extremo a extremo', 'Ajusta el mapa de misiones, el estado de la barra de sincronización y el seguimiento del SOS tras una entrega.', 'mobile', 4],
  ['Construir la landing page responsive', 'Desarrolla el sitio estático en HTML, CSS y JavaScript con la navegación y el pie de página, según los mock-ups del capítulo VI.', 'landing', 6],
  ['Alinear la landing con los mock-ups aprobados', 'Restaura la navegación, los textos y las proporciones aprobados, corrige el estado activo del menú y el logotipo.', 'landing', 4],
  ['Publicar la landing en Vercel', 'Conecta el proyecto site con GitHub, publica cada push a develop y prepara la versión 0.1.0.', 'landing', 2],
];

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const dry = process.argv.includes('--dry');
const fail = (m) => { console.error('✗ ' + m); process.exit(1); };
const chapterPath = args[0] || ['chapters/chapter7.md', 'chapter7.md'].find((p) => fs.existsSync(p)) || 'chapters/chapter7.md';
if (!fs.existsSync(chapterPath)) fail('No encuentro el capítulo en: ' + chapterPath + '\n  Ejecuta el script en la carpeta del informe (ase-report) o pasa la ruta de chapter7.md.');

const missing = [];
const who = (area) => ASSIGNEES[area] || (missing.push(AREA[area]), 'Por asignar');
const orTodo = (v, label) => v || (missing.push(label), 'Por completar');
const cell = (s) => String(s).replace(/\|/g, '/').replace(/\n/g, ' ');

// Reparte horas enteras entre n tasks (método del resto mayor), mínimo 1 por task.
const split = (total, n) => {
  const base = Math.max(1, Math.floor(total / n));
  const out = Array(n).fill(base);
  let rest = total - base * n;
  for (let k = 0; rest > 0; k = (k + 1) % n, rest--) out[k]++;
  return out;
};

const totalSP = STORIES.reduce((s, st) => s + st[2], 0);
const spBy = (areaTest) => STORIES.filter((st) => st[3].some((t) => areaTest(t[2]))).length;
const fmtDate = PLANNING_DATE;

const rows = [];
let taskNo = 0; let totalHours = 0;
const nextId = () => 'T-' + String(++taskNo).padStart(2, '0');
for (const [id, title, sp, tasks] of STORIES) {
  const hrs = split(sp * HOURS_PER_STORY_POINT, tasks.length);
  tasks.forEach(([t, d, area], k) => {
    rows.push(['| ' + (k === 0 ? id : '') + ' | ' + (k === 0 ? cell(title) : ''), nextId(), cell(t), cell(d), hrs[k], who(area), 'Done']);
    totalHours += hrs[k];
  });
}
rows.push(['| — | Tareas generales (sin User Story)', null, null, null, null, null, null]);
for (const [t, d, area, h] of GENERAL) { rows.push(['| ' + '' + ' | ', nextId(), cell(t), cell(d), h, who(area), 'Done']); totalHours += h; }

const backlogRows = rows.map((r) => {
  if (r[1] === null) return r[0] + ' | | | | | | |';
  return r[0] + ' | ' + r[1] + ' | ' + r[2] + ' | ' + r[3] + ' | ' + r[4] + ' | ' + r[5] + ' | ' + r[6] + ' |';
});

const storyTable = STORIES.map(([id, title, sp, tasks]) => {
  const prods = [...new Set(tasks.map((t) => AREA[t[2]]))].join(', ');
  return '| ' + id + ' | ' + cell(title) + ' | ' + sp + ' | ' + prods + ' |';
});

const planning = [
  '## 7.2.1.1. Sprint Planning 1',
  '',
  'El Sprint Planning 1 definió el alcance del primer Sprint a partir del Product Backlog de la sección 3.4. El equipo comprometió las historias de los tres productos que se construyeron primero: la Landing Page, el Backend API (junto con el AI Service y el smart contract `DeliveryRegistry`, que implementan sus mismas historias) y la aplicación móvil. Las historias de la Web App (Centro de Mando y Consulta pública) se dejaron para el Sprint 2.',
  '',
  '| Campo | Valor |',
  '|---|---|',
  '| **Sprint #** | Sprint 1 |',
  '| **Sprint Planning Background** | |',
  '| Date | ' + fmtDate + ' |',
  '| Time | ' + orTodo(PLANNING_TIME, 'Hora del Sprint Planning') + ' |',
  '| Location | ' + orTodo(LOCATION, 'Ubicación del Sprint Planning') + ' |',
  '| Prepared By | ' + PREPARED_BY + ' |',
  '| Attendees (to planning meeting) | ' + ATTENDEES.join(' / ') + ' |',
  '| Sprint 0 Review Summary | No aplica: el Sprint 1 es el primer Sprint del proyecto. El trabajo previo fue la especificación de requisitos, el diseño y la arquitectura de los capítulos I a VI, que dejaron el Product Backlog de 40 historias. |',
  '| Sprint 0 Retrospective Summary | No aplica: el Sprint 1 es el primer Sprint del proyecto, por lo que todavía no hay una retrospectiva previa. |',
  '| **Sprint Goal & User Stories** | |',
  '| Sprint 1 Goal | Entregar la primera versión funcional de la Landing Page, el Backend API (con el AI Service y el smart contract) y la aplicación móvil, de modo que el flujo de reporte de campo, priorización, distribución y entrega verificada en Blockchain funcione de punta a punta sobre servicios desplegados. Métrica de cumplimiento: todas las historias del Sprint cumplen los criterios de aceptación del capítulo III (64 escenarios de aceptación con Cucumber, 87 pruebas del AI Service, 13 del contrato y 31 archivos de pruebas de la app) y los productos quedan publicados (Backend API y AI Service en Azure, contrato en Sepolia y Landing Page en Vercel). |',
  '| Sprint 1 Velocity | ' + totalSP + ' Story Points comprometidos para el Sprint, con ' + totalHours + ' horas de trabajo estimadas (' + HOURS_PER_STORY_POINT + ' horas por Story Point más las tareas generales). |',
  '| Sum of Story Points | ' + totalSP + ' |',
  '',
  'Las historias incluidas en el Sprint 1 son las siguientes, en el orden del Product Backlog:',
  '',
  '| User Story Id | Título | Story Points | Productos |',
  '|---|---|---|---|',
  ...storyTable,
  '',
  '',
].join('\n');

const backlog = [
  '## 7.2.1.2. Sprint Backlog 1',
  '',
  'El objetivo del Sprint 1 es dejar funcionando la primera versión de la Landing Page, el Backend API (con el AI Service y el smart contract) y la aplicación móvil. El tablero del Sprint se gestionó en Trello, con las mismas columnas del Product Backlog, y las historias comprometidas se descompusieron en los tasks de la tabla. Todos los tasks terminaron en `Done` antes del cierre del Sprint, el 7 de noviembre de 2026.',
  '',
  '<!-- Pendiente: agregar aquí la captura del Board del Sprint 1 en Trello y su enlace público. -->',
  '',
  '**Sprint #:** Sprint 1',
  '',
  '| User Story Id | User Story Title | Task Id | Task Title | Description | Estimation (Hours) | Assigned To | Status |',
  '|---|---|---|---|---|---|---|---|',
  ...backlogRows,
  '',
  'La estimación de horas de cada historia es el producto de sus Story Points por ' + HOURS_PER_STORY_POINT + ' horas, repartido entre sus tasks. Las tareas generales no dependen de una historia en particular y se estimaron por separado.',
  '',
  '',
].join('\n');

const raw = fs.readFileSync(chapterPath, 'utf8');
const crlf = raw.includes('\r\n');
const text = raw.replace(/\r\n/g, '\n');
const A = '## 7.2.1.1. Sprint Planning 1';
const B = '## 7.2.1.3. Development Evidence for Sprint Review';
const i = text.indexOf(A); const j = text.indexOf(B);
if (i < 0 || j < i) fail('No encuentro los encabezados 7.2.1.1 y 7.2.1.3 en el archivo.');
const out = (text.slice(0, i) + planning + backlog + text.slice(j)).replace(/\n/g, crlf ? '\r\n' : '\n');

console.log('Sprint 1: ' + STORIES.length + ' historias, ' + totalSP + ' Story Points, ' + taskNo + ' tasks, ' + totalHours + ' horas.');
if (out === raw) console.log('= Las secciones ya estaban al día.');
else if (dry) console.log('(--dry) No escribí nada.');
else { fs.writeFileSync(chapterPath, out); console.log('✓ Escribí 7.2.1.1 y 7.2.1.2 en ' + chapterPath); }
const miss = [...new Set(missing)];
if (miss.length) console.log('\nQuedaron como "Por completar" / "Por asignar" (edita las constantes al inicio del script y vuelve a ejecutarlo):\n  - ' + miss.join('\n  - '));
