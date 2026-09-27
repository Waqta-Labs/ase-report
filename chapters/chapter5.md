# Capítulo V: Tactical-Level Software Design

En este capítulo se detalla el diseño interno de los cinco bounded contexts definidos en el Capítulo IV: Emergency Management, Resource Management, Traceability, Identity Access y Citizen Transparency. Los cinco se implementan dentro del contenedor Backend API, que es un monolito modular (TS-C05), y cada uno se organiza con arquitectura hexagonal en cuatro capas.

La capa de dominio contiene el modelo del contexto: aggregates, entities, value objects, enumeraciones, domain services y las interfaces de los repositorios. No depende de ningún framework ni de la base de datos. La capa de interfaz expone el contexto mediante controladores REST y convierte cada petición HTTP en un comando o una consulta. La capa de aplicación coordina los casos de uso con Command Handlers, Query Services y Event Handlers, y deja las reglas de negocio al dominio. La capa de infraestructura implementa los puertos con Spring Data JPA sobre PostgreSQL y con adaptadores hacia el AI Service y hacia los demás bounded contexts, según las relaciones del Context Mapping del Capítulo IV.

Cada contexto incluye su Component Level Diagram, modelado en Structurizr, y sus Code Level Diagrams: el diagrama de clases de la capa de dominio y el diseño de la base de datos. Cada bounded context tiene su propio schema dentro de la base de datos PostgreSQL compartida, de modo que ninguna tabla pertenece a dos contextos.

Los contextos se presentan en el mismo orden que sus Bounded Context Canvases en el Capítulo IV.

---

## 5.1. Bounded Context: Emergency Management

Emergency Management es un contexto Core porque concentra los drivers FD-01 y FD-02, ambos con alta importancia para los stakeholders y alta complejidad técnica. Registra las emergencias y sus zonas afectadas, estructura los reportes de campo con el AI Service, calcula el score de urgencia de cada zona y gestiona los planes de distribución hasta que una autoridad los aprueba o los rechaza. Ninguna recomendación se ejecuta sin esa aprobación (TS-C01).

El contexto tiene tres aggregates: Emergency, Zone y Distribution Plan. En el Capítulo IV solo se identificaron Zone y Distribution Plan. Al detallar el modelo se vio que una misma emergencia puede tener varias zonas activas a la vez y que, sin un aggregate Emergency, esa relación quedaría reducida a un campo de texto repetido en cada zona.

### 5.1.1. Domain Layer

La capa de dominio hace cumplir tres reglas del contexto: toda zona pertenece a una emergencia, todo score de urgencia incluye su explicación y la versión del modelo que lo generó, y ningún plan de distribución pasa a `APPROVED` sin registrar la autoridad que lo aprobó y la fecha.

El diagrama agrupa las clases por aggregate. Cada grupo contiene la raíz, sus entidades y value objects, el repositorio que lo persiste y los domain events que publica. Las líneas punteadas `emergencyId` y `zoneId` son las únicas referencias entre aggregates. Los atributos y métodos de cada clase están en el diccionario que sigue y en el diagrama de clases de la sección 5.1.7.1.

<div align="center">
<img src="../assets/domain-layer/EmergencyManagement.png" alt="Domain Layer Emergency Management" width="800">
</div>

| Clase | Categoría | Propósito |
|---|---|---|
| `Emergency` | Aggregate Root | Agrupa las zonas afectadas por un mismo desastre y controla si la emergencia sigue activa. |
| `Zone` | Aggregate Root | Guarda el impacto, el score de urgencia y el estado de atención de una zona. |
| `FieldReport` | Entity | Reporte de campo en lenguaje natural, interno al aggregate `Zone`. |
| `DistributionPlan` | Aggregate Root | Propuesta de distribución de recursos para una zona, sujeta a aprobación. |
| `DistributionItem` | Entity | Cantidad de un recurso dentro de un plan, interna al aggregate `DistributionPlan`. |
| `AdministrativeLocation` | Value Object | Departamento, provincia y distrito de la emergencia. |
| `Geolocation` | Value Object | Coordenadas de la zona. |
| `PopulationImpact` | Value Object | Población afectada de la zona y sus grupos vulnerables. |
| `UrgencyScore` | Value Object | Score de urgencia con sus variables explicativas y la versión del modelo. |
| `StructuredFieldData` | Value Object | Resultado de la estructuración NLP de un reporte de campo. |
| `DistributionRecommendation` | Value Object | Recomendación que devuelve el servicio de optimización. |
| `EmergencyType`, `EmergencyStatus`, `ZoneStatus`, `DamageLevel`, `PriorityLevel`, `ReportSource`, `DistributionPlanStatus` | Enumeration | Valores cerrados del lenguaje ubicuo del contexto. |
| `UrgencyScoringService` | Domain Service (interfaz) | Calcula el score de urgencia de una zona. |
| `DistributionOptimizationService` | Domain Service (interfaz) | Recomienda una distribución que no exceda el inventario disponible. |
| `EmergencyRepository`, `ZoneRepository`, `DistributionPlanRepository` | Repository (interfaz) | Persistencia de cada aggregate. |

**Aggregates y entities.** `Emergency`, `Zone` y `DistributionPlan` se referencian entre sí solo por identificador (`emergencyId`, `zoneId`). Así cada aggregate se guarda en su propia transacción, y actualizar una zona no bloquea a su emergencia ni a sus planes. `FieldReport` vive dentro de `Zone` porque un reporte de campo no tiene sentido fuera de su zona; se estructura una sola vez con `markProcessed()`, como pide US-02. `DistributionPlan` contiene sus `DistributionItem` y controla el ciclo `PROPOSED → APPROVED o REJECTED → EXECUTED`. El método `approve()` recibe obligatoriamente un `AuthorityId`: es la forma en que el modelo hace cumplir TS-C01.

**Value objects.** `UrgencyScore` guarda el valor, el nivel de prioridad, las variables que más pesaron en el cálculo (`topFeatures`) y la versión del modelo. Con esos datos la autoridad puede justificar por qué priorizó una zona, que es lo que pide US-05. `StructuredFieldData` guarda las variables extraídas del reporte y también las que no se pudieron identificar, para que queden marcadas para revisión (US-02). Los identificadores (`EmergencyId`, `ZoneId`, `FieldReportId`, `DistributionPlanId`, `DistributionItemId`) envuelven un `UUID` e impiden usar por error el identificador de un aggregate en lugar de otro. `AuthorityId` y `ResourceId` hacen lo mismo con las referencias a Identity Access y a Resource Management, e `InventorySnapshot` trae el inventario disponible desde Resource Management. En el diagrama de clases estos tipos aparecen solo como tipo de atributo.

**Domain services.** `UrgencyScoringService` y `DistributionOptimizationService` representan las dos decisiones centrales del contexto: priorizar zonas y recomendar cómo distribuir los recursos. El dominio define solo la interfaz. La implementación está en la capa de infraestructura y llama al AI Service a través de un Anti-Corruption Layer (TS-C04), así que un cambio en el contrato REST del servicio de IA solo afecta a ese adaptador.

**Repositories.** `EmergencyRepository`, `ZoneRepository` y `DistributionPlanRepository` definen cómo se guardan y se recuperan los aggregates, sin referencias a JPA ni a PostgreSQL.

**Domain events.** Los aggregates publican `EmergencyRegistered`, `ZoneRegistered`, `FieldReportRegistered`, `UrgencyScoreCalculated`, `DistributionPlanProposed`, `DistributionPlanApproved` y `DistributionPlanRejected`. `FieldReportRegistered` dispara dentro del mismo contexto la estructuración del reporte y el recálculo del score. Citizen Transparency usa los eventos para actualizar la vista pública, Resource Management reacciona a `DistributionPlanApproved` para asignar personal y la auditoría registra cada decisión.

#### Diccionario de clases

Las tablas siguientes detallan los miembros de cada clase con su tipo y su visibilidad, tal como aparecen en el diagrama de la sección 5.1.7.1.

**`Emergency`** (Aggregate Root)

| Miembro | Tipo | Visibilidad | Descripción |
|---|---|---|---|
| `id` | `EmergencyId` | private | Identificador de la emergencia. |
| `name` | `String` | private | Nombre de la emergencia, por ejemplo "Huaico Chosica 2026". |
| `type` | `EmergencyType` | private | Tipo de desastre. |
| `description` | `String` | private | Descripción libre. |
| `location` | `AdministrativeLocation` | private | Departamento, provincia y distrito. |
| `status` | `EmergencyStatus` | private | Indica si la emergencia está activa o cerrada. |
| `startDate` | `LocalDate` | private | Fecha de inicio del desastre. |
| `register(String, EmergencyType, String, AdministrativeLocation, LocalDate)` | `Emergency` | public static | Crea la emergencia en estado `ACTIVE`. |
| `close()` | `void` | public | Cierra la emergencia; desde ese momento no admite nuevas zonas. |
| `isActive()` | `boolean` | public | Indica si la emergencia sigue activa. |

**`Zone`** (Aggregate Root)

| Miembro | Tipo | Visibilidad | Descripción |
|---|---|---|---|
| `id` | `ZoneId` | private | Identificador de la zona. |
| `emergencyId` | `EmergencyId` | private | Emergencia a la que pertenece. |
| `name` | `String` | private | Nombre o referencia de la zona. |
| `geolocation` | `Geolocation` | private | Latitud y longitud. |
| `populationImpact` | `PopulationImpact` | private | Población afectada y grupos vulnerables. |
| `damageLevel` | `DamageLevel` | private | Nivel de daño reportado. |
| `urgencyScore` | `UrgencyScore` | private | Score de urgencia vigente; está vacío hasta que se calcula. |
| `status` | `ZoneStatus` | private | Estado de atención de la zona. |
| `fieldReports` | `List<FieldReport>` | private | Reportes de campo de la zona. |
| `lastAidReceivedAt` | `LocalDateTime` | private | Fecha de la última entrega confirmada. |
| `register(EmergencyId, String, Geolocation, PopulationImpact, DamageLevel)` | `Zone` | public static | Registra la zona en estado `REGISTERED`. |
| `attachFieldReport(FieldReport)` | `void` | public | Agrega un reporte de campo a la zona. |
| `updateUrgencyScore(UrgencyScore)` | `void` | public | Aplica un nuevo score y pasa la zona a `PRIORITIZED`. |
| `markAidReceived()` | `void` | public | Pasa la zona a `SERVED` cuando se confirma una entrega. |
| `hasSufficientDataForScoring()` | `boolean` | public | Indica si hay variables suficientes para calcular el score (US-04). |

**`FieldReport`** (Entity)

| Miembro | Tipo | Visibilidad | Descripción |
|---|---|---|---|
| `id` | `FieldReportId` | private | Identificador del reporte. |
| `rawText` | `String` | private | Texto del reporte tal como se registró. |
| `source` | `ReportSource` | private | Quién envió el reporte. |
| `reportedAt` | `LocalDateTime` | private | Fecha de registro. |
| `structuredData` | `StructuredFieldData` | private | Resultado de la estructuración NLP; está vacío hasta que se procesa. |
| `register(String, ReportSource)` | `FieldReport` | public static | Registra un reporte sin procesar. |
| `markProcessed(StructuredFieldData)` | `void` | public | Guarda el resultado de la estructuración NLP. |
| `isProcessed()` | `boolean` | public | Indica si el reporte ya fue estructurado. |

**`DistributionPlan`** (Aggregate Root)

| Miembro | Tipo | Visibilidad | Descripción |
|---|---|---|---|
| `id` | `DistributionPlanId` | private | Identificador del plan. |
| `emergencyId` | `EmergencyId` | private | Emergencia asociada. |
| `zoneId` | `ZoneId` | private | Zona a la que se destina el plan. |
| `items` | `List<DistributionItem>` | private | Recursos y cantidades propuestas. |
| `status` | `DistributionPlanStatus` | private | Estado del plan. |
| `justification` | `String` | private | Explicación que devuelve el servicio de optimización. |
| `modelVersion` | `String` | private | Versión del modelo de optimización. |
| `approvedBy` | `AuthorityId` | private | Autoridad que aprobó o rechazó el plan. |
| `approvedAt` | `LocalDateTime` | private | Fecha de la decisión. |
| `rejectedReason` | `String` | private | Motivo del rechazo, si lo hubo. |
| `propose(EmergencyId, ZoneId, List<DistributionItem>, String, String)` | `DistributionPlan` | public static | Crea el plan en estado `PROPOSED`. |
| `approve(AuthorityId)` | `void` | public | Aprueba el plan; requiere una autoridad (TS-C01). |
| `reject(AuthorityId, String)` | `void` | public | Rechaza el plan con un motivo obligatorio. |
| `markExecuted()` | `void` | public | Pasa el plan a `EXECUTED` cuando Traceability confirma la entrega. |
| `isApproved()` | `boolean` | public | Indica si el plan está aprobado. |

**`DistributionItem`** (Entity)

| Miembro | Tipo | Visibilidad | Descripción |
|---|---|---|---|
| `id` | `DistributionItemId` | private | Identificador de la línea. |
| `resourceId` | `ResourceId` | private | Recurso del catálogo de Resource Management (Shared Kernel). |
| `quantity` | `int` | private | Cantidad propuesta. |
| `of(ResourceId, int)` | `DistributionItem` | public static | Crea una línea de distribución. |

**Value Objects**

| Clase | Miembros | Descripción |
|---|---|---|
| `AdministrativeLocation` | `-department: String`, `-province: String`, `-district: String`, `+getFullName(): String` | Ubicación administrativa de la emergencia. |
| `Geolocation` | `-latitude: double`, `-longitude: double` | Coordenadas de la zona. |
| `PopulationImpact` | `-familiesAffected: int`, `-peopleAffected: int`, `-children: int`, `-elderlyPeople: int`, `-disabledPeople: int`, `+getVulnerablePopulation(): int` | Impacto poblacional. `getVulnerablePopulation()` suma niños, adultos mayores y personas con discapacidad. |
| `UrgencyScore` | `-value: double`, `-level: PriorityLevel`, `-topFeatures: List<String>`, `-modelVersion: String`, `-calculatedAt: LocalDateTime`, `+isCritical(): boolean` | Score de urgencia con su explicación (US-05). |
| `StructuredFieldData` | `-extractedIndicators: Map<String, String>`, `-missingVariables: List<String>`, `+hasMissingVariables(): boolean` | Resultado de la estructuración NLP (US-02). |
| `DistributionRecommendation` | `-items: List<DistributionItem>`, `-justification: String`, `-modelVersion: String`, `+isEmpty(): boolean` | Recomendación que devuelve `DistributionOptimizationService`. |

**Enumeraciones**

| Enumeración | Valores |
|---|---|
| `EmergencyType` | `EARTHQUAKE`, `FLOOD`, `LANDSLIDE`, `FIRE`, `OTHER` |
| `EmergencyStatus` | `ACTIVE`, `CLOSED` |
| `ZoneStatus` | `REGISTERED`, `PRIORITIZED`, `SERVED` |
| `DamageLevel` | `LOW`, `MODERATE`, `SEVERE`, `CRITICAL` |
| `PriorityLevel` | `LOW`, `MEDIUM`, `HIGH`, `CRITICAL` |
| `ReportSource` | `AUTHORITY`, `VOLUNTEER`, `CITIZEN` |
| `DistributionPlanStatus` | `PROPOSED`, `APPROVED`, `REJECTED`, `EXECUTED` |

**Domain Services y Repositories**

| Interfaz | Categoría | Métodos |
|---|---|---|
| `UrgencyScoringService` | Domain Service | `+calculateScore(Zone): UrgencyScore` |
| `DistributionOptimizationService` | Domain Service | `+recommend(Zone, InventorySnapshot): DistributionRecommendation` |
| `EmergencyRepository` | Repository | `+save(Emergency): Emergency`, `+findById(EmergencyId): Optional<Emergency>`, `+findActive(): List<Emergency>` |
| `ZoneRepository` | Repository | `+save(Zone): Zone`, `+findById(ZoneId): Optional<Zone>`, `+findByEmergencyId(EmergencyId): List<Zone>` |
| `DistributionPlanRepository` | Repository | `+save(DistributionPlan): DistributionPlan`, `+findById(DistributionPlanId): Optional<DistributionPlan>`, `+findByZoneId(ZoneId): List<DistributionPlan>` |

**Relaciones entre clases**

| Origen | Relación | Destino | Multiplicidad | Descripción |
|---|---|---|---|---|
| `Zone` | Asociación (pertenece a) | `Emergency` | 0..* a 1 | Cada zona pertenece a una emergencia y la referencia por `emergencyId`. |
| `DistributionPlan` | Asociación (destinada a) | `Zone` | 0..* a 1 | Cada plan se destina a una zona y la referencia por `zoneId`. |
| `Emergency` | Composición | `AdministrativeLocation` | 1 a 1 | La emergencia contiene su ubicación. |
| `Zone` | Composición | `FieldReport` | 1 a 0..* | Los reportes de campo son internos a la zona. |
| `Zone` | Composición | `Geolocation`, `PopulationImpact` | 1 a 1 | La zona contiene su ubicación y su impacto poblacional. |
| `Zone` | Composición | `UrgencyScore` | 1 a 0..1 | La zona tiene como máximo un score vigente. |
| `FieldReport` | Composición | `StructuredFieldData` | 1 a 0..1 | El reporte guarda su resultado NLP una vez procesado. |
| `DistributionPlan` | Composición | `DistributionItem` | 1 a 1..* | El plan contiene al menos una línea. |
| `DistributionRecommendation` | Agregación | `DistributionItem` | 1 a 1..* | La recomendación propone las líneas que tomará el plan. |
| `Emergency`, `Zone`, `FieldReport`, `UrgencyScore`, `DistributionPlan` | Asociación | Enumeraciones | 1 a 1 | Tipo, estado, nivel de daño, origen del reporte y nivel de prioridad. |
| `UrgencyScoringService` | Dependencia (calcula) | `UrgencyScore` | No aplica | Calcula el score de una zona. |
| `DistributionOptimizationService` | Dependencia (produce) | `DistributionRecommendation` | No aplica | Genera la recomendación a partir de la zona y del inventario. |
| `EmergencyRepository`, `ZoneRepository`, `DistributionPlanRepository` | Dependencia (persiste) | `Emergency`, `Zone`, `DistributionPlan` | No aplica | Cada repositorio persiste su aggregate. |

### 5.1.2. Interface Layer

La capa de interfaz expone Emergency Management con cuatro controladores REST y un consumidor de eventos. Los controladores no contienen reglas de negocio: validan la petición, arman el comando o la consulta, la envían al handler que corresponde y devuelven el recurso de respuesta. Los endpoints que modifican datos exigen un JWT emitido por Identity Access y validan el rol de la autoridad con `@PreAuthorize`.

<div align="center">
<img src="../assets/interface-layer/EmergencyManagement.png" alt="Interface Layer Emergency Management" width="900">
</div>

*   **EmergencyController:** `POST /api/v1/emergencies`, `GET /api/v1/emergencies`, `GET /api/v1/emergencies/{id}` y `PATCH /api/v1/emergencies/{id}/close`.
*   **ZoneController:** `POST /api/v1/emergencies/{emergencyId}/zones`, `GET /api/v1/emergencies/{emergencyId}/zones` (ranking por urgencia), `GET /api/v1/zones/{id}`, `GET /api/v1/zones/{id}/score` (score con sus variables explicativas, TS-02) y `PATCH /api/v1/zones/{id}/priority` (ajuste manual). Usa `ZoneResourceAssembler` para convertir el aggregate en sus tres recursos de salida.
*   **FieldReportController:** `POST /api/v1/zones/{zoneId}/field-reports` (TS-01) y `GET /api/v1/zones/{zoneId}/field-reports`.
*   **DistributionPlanController:** `POST /api/v1/zones/{zoneId}/distribution-plans` (TS-04), `GET /api/v1/distribution-plans/{id}`, `POST /api/v1/distribution-plans/{id}/approve` y `POST /api/v1/distribution-plans/{id}/reject`. La aprobación no lleva cuerpo, porque la autoridad se obtiene del JWT de la petición.
*   **DeliveryConfirmedEventConsumer:** recibe `DeliveryConfirmed` de Traceability con un listener interno de Spring (`@EventListener`). Como AuxIA es un monolito modular, no hace falta un broker de mensajería.

Los recursos de entrada son `RegisterEmergencyRequest`, `RegisterZoneRequest`, `RegisterFieldReportRequest`, `AdjustZonePriorityRequest` y `RejectDistributionPlanRequest`. Los de salida son `EmergencyResource`, `ZoneResource`, `ZoneRankingItemResource`, `ZoneScoreResource`, `FieldReportResource` y `DistributionPlanResource`.

### 5.1.3. Application Layer

La capa de aplicación tiene un Command Handler por caso de uso, dos Event Handlers y tres Query Services. Cada handler recibe los repositorios y puertos que necesita, carga el aggregate, llama al método de dominio que corresponde y guarda el resultado. Los puertos de salida (`FieldReportStructuringService`, `InventoryAvailabilityPort`, `ResourceReservationPort`, `AuthorizationPort` y `DomainEventPublisher`) se declaran en esta capa porque los handlers los usan para comunicarse con otros sistemas y no contienen reglas de negocio.

<div align="center">
<img src="../assets/application-layer/EmergencyManagement.png" alt="Application Layer Emergency Management" width="900">
</div>

*   **Emergencias y zonas:** `RegisterEmergencyCommandHandler`, `CloseEmergencyCommandHandler` y `RegisterZoneCommandHandler`. Este último carga primero la emergencia para rechazar zonas nuevas en una emergencia cerrada.
*   **Reportes de campo y score:** `RegisterFieldReportCommandHandler` guarda el reporte y publica `FieldReportRegistered`. `FieldReportRegisteredEventHandler` reacciona a ese evento: llama a `StructureFieldReportCommandHandler`, que estructura el texto con NLP, y después a `CalculateUrgencyScoreCommandHandler`, que recalcula el score de la zona. Así el ranking se actualiza sin que la autoridad tenga que pedirlo, como en la policy correspondiente del EventStorming del Capítulo IV. `AdjustZonePriorityManuallyCommandHandler` permite a la autoridad reemplazar el score calculado y publica el cambio para que quede en la auditoría.
*   **Planes de distribución:** `GenerateDistributionRecommendationCommandHandler` obtiene el inventario con `InventoryAvailabilityPort`, pide la recomendación a `DistributionOptimizationService`, crea el plan y reserva los recursos de forma provisional con `ResourceReservationPort`. `ApproveDistributionPlanCommandHandler` y `RejectDistributionPlanCommandHandler` consultan `AuthorizationPort` antes de decidir, porque el rol de la autoridad puede haber cambiado desde que se emitió su token (QAD-02). Cuando el plan se rechaza, el handler libera la reserva.
*   **Entregas:** `DeliveryConfirmedEventHandler` recibe la confirmación de Traceability, pasa la zona a `SERVED` y el plan a `EXECUTED`.
*   **Consultas:** `EmergencyQueryService`, `ZoneQueryService` y `DistributionPlanQueryService` resuelven las lecturas sin modificar ningún aggregate.

### 5.1.4. Infrastructure Layer

La capa de infraestructura implementa las interfaces del dominio y los puertos de salida de la capa de aplicación. Cada clase implementa una sola interfaz, así que cambiar una tecnología, por ejemplo el cliente HTTP del AI Service, solo afecta a su adaptador.

<div align="center">
<img src="../assets/infrastructure-layer/EmergencyManagement.png" alt="Infrastructure Layer Emergency Management" width="700">
</div>

*   **Persistencia:** `JpaEmergencyRepository`, `JpaZoneRepository` y `JpaDistributionPlanRepository` implementan los repositorios del dominio. Cada uno usa un repositorio de Spring Data JPA sobre el schema `emergency_management` y convierte las entidades JPA en aggregates.
*   **AI Service:** `RestFieldReportStructuringGateway`, `RestUrgencyScoringGateway` y `RestDistributionOptimizationGateway` forman el Anti-Corruption Layer hacia el AI Service. Llaman a sus endpoints de NLP (TS-01), score (TS-02) y optimización (TS-04) con `RestClient` y traducen cada respuesta a un value object del dominio.
*   **Resource Management:** `InProcessInventoryAvailabilityAdapter` e `InProcessResourceReservationAdapter` llaman directamente a los servicios de consulta y de reserva de Resource Management, que corren en el mismo proceso (Shared Kernel).
*   **Identity Access:** `IdentityAccessClient` implementa `AuthorizationPort` consultando el Open Host Service de Identity Access.
*   **Eventos:** `SpringDomainEventPublisher` publica los domain events con el `ApplicationEventPublisher` de Spring para que los reciban Citizen Transparency, Resource Management y la auditoría.

### 5.1.6. Bounded Context Software Architecture Component Level Diagrams

El diagrama muestra cómo se descompone Emergency Management dentro del contenedor Backend API. Controladores, handlers, repositorios y adaptadores aparecen como componentes separados; los demás bounded contexts y el AI Service aparecen como sistemas externos. Se modeló en Structurizr DSL y se exportó desde Structurizr Local.

<div align="center">
<img src="../assets/container-diagram/EmergencyManagement-Components.png" alt="Component Diagram Emergency Management" width="900">
</div>

*   **Emergency, Zone, Field Report y Distribution Plan Controllers:** reciben las solicitudes JSON/HTTPS de la Web Application y las pasan a los Command Handlers o a los Query Services.
*   **Delivery Confirmed Event Consumer:** recibe `DeliveryConfirmed` de Traceability y lo pasa al Delivery Confirmed Event Handler.
*   **Command Handlers:** hay un grupo para emergencias y zonas, otro para reportes de campo, otro para el score de urgencia y otro para los planes de distribución.
*   **Emergency Query Services:** resuelven el ranking de zonas, el detalle de cada zona y el historial de planes.
*   **Emergency Management Domain Model:** contiene `Emergency`, `Zone`, `FieldReport` y `DistributionPlan`.
*   **Emergency Repository y Distribution Plan Repository:** persisten los aggregates en el schema `emergency_management` con Spring Data JPA.
*   **AI Service ACL:** traduce las llamadas de NLP, score y optimización al contrato del AI Service (TS-C04).
*   **Resource Management Adapter:** consulta el inventario disponible y pide la reserva o liberación de recursos (Shared Kernel).
*   **Identity Access Client:** verifica el rol de la autoridad antes de aprobar o rechazar un plan (TS-C01).
*   **Domain Event Publisher:** envía `ZoneRegistered` a Citizen Transparency y `DistributionPlanApproved` a Citizen Transparency y a Resource Management.

### 5.1.7. Bounded Context Software Architecture Code Level Diagrams

#### 5.1.7.1. Bounded Context Domain Layer Class Diagrams

El diagrama de clases se modeló en PlantUML e incluye las clases descritas en la sección 5.1.1, con la visibilidad de cada miembro y la multiplicidad de cada relación.

<div align="center">
<img src="../assets/class-diagram/EmergencyManagement.png" alt="Class Diagram Emergency Management" width="900">
</div>

#### 5.1.7.2. Bounded Context Database Design Diagram

El schema `emergency_management` guarda los tres aggregates del contexto en cinco tablas: `emergencies`, `zones` con su tabla hija `field_reports`, y `distribution_plans` con su tabla hija `distribution_items`. El diagrama se generó con DataGrip sobre la base de datos PostgreSQL alojada en Neon.

<div align="center">
<img src="../assets/architecture-db/emergency_management.png" alt="Database Design Diagram Emergency Management" width="700">
</div>

Las reglas del dominio también se aplican en la base de datos. `distribution_plans` se relaciona con `zones` mediante una foreign key compuesta `(zone_id, emergency_id)`, de modo que un plan no puede quedar asociado a una zona de otra emergencia. Un `CHECK` exige autoridad y fecha a todo plan aprobado, ejecutado o rechazado, y el motivo a todo plan rechazado (TS-C01). Otro `CHECK` obliga a que las columnas `urgency_*` de `zones` estén todas completas o todas vacías, igual que el value object `UrgencyScore`. Las emergencias y las zonas no se pueden borrar mientras tengan registros que dependan de ellas, porque en el dominio una emergencia se cierra y no se elimina.

Las columnas `approved_by` de `distribution_plans` y `resource_id` de `distribution_items` apuntan a datos de Identity Access y de Resource Management. No se declaran como foreign keys porque esos datos están en otros schemas, y una foreign key entre schemas uniría la base de datos de dos bounded contexts que deben poder cambiar por separado.

---

## 5.2. Bounded Context: Resource Management

Resource Management es un contexto **Supporting** que ejecuta las decisiones tomadas por Emergency Management: gestiona el inventario de recursos humanitarios y el personal (Staff) disponible para las entregas. Sus aggregates son **Inventory** y **Staff**.

### 5.2.1. Domain Layer

### 5.2.2. Interface Layer

### 5.2.3. Application Layer

### 5.2.4. Infrastructure Layer

### 5.2.6. Bounded Context Software Architecture Component Level Diagrams

### 5.2.7. Bounded Context Software Architecture Code Level Diagrams

#### 5.2.7.1. Bounded Context Domain Layer Class Diagrams

#### 5.2.7.2. Bounded Context Database Design Diagram

---

## 5.3. Bounded Context: Traceability

Traceability es el segundo contexto **Core** de AuxIA. Registra y certifica las entregas realizadas en campo, gestionando la evidencia fotográfica y el respaldo verificable mediante Blockchain (TS-C02, TS-C03). Su aggregate es **Delivery**.

### 5.3.1. Domain Layer

### 5.3.2. Interface Layer

### 5.3.3. Application Layer

### 5.3.4. Infrastructure Layer

### 5.3.6. Bounded Context Software Architecture Component Level Diagrams

### 5.3.7. Bounded Context Software Architecture Code Level Diagrams

#### 5.3.7.1. Bounded Context Domain Layer Class Diagrams

#### 5.3.7.2. Bounded Context Database Design Diagram

---

## 5.4. Bounded Context: Identity Access

Identity Access es un contexto **Generic** orientado a compliance. Gestiona la identidad, los roles y las organizaciones de los usuarios de AuxIA, y expone un Open Host Service consultado de forma síncrona por los demás contextos antes de ejecutar comandos críticos. Su aggregate es **Organization** (junto con la identidad de usuario).

### 5.4.1. Domain Layer

### 5.4.2. Interface Layer

### 5.4.3. Application Layer

### 5.4.4. Infrastructure Layer

### 5.4.6. Bounded Context Software Architecture Component Level Diagrams

### 5.4.7. Bounded Context Software Architecture Code Level Diagrams

#### 5.4.7.1. Bounded Context Domain Layer Class Diagrams

#### 5.4.7.2. Bounded Context Database Design Diagram

---

## 5.5. Bounded Context: Citizen Transparency

Citizen Transparency es un contexto **Supporting** de tipo read model reactivo, sin aggregate de escritura propio. Proyecta de forma pública y filtrada los cambios de estado publicados por Emergency Management y Traceability, sin exponer datos sensibles ni requerir autenticación (EP-08).

### 5.5.1. Domain Layer

### 5.5.2. Interface Layer

### 5.5.3. Application Layer

### 5.5.4. Infrastructure Layer

### 5.5.6. Bounded Context Software Architecture Component Level Diagrams

### 5.5.7. Bounded Context Software Architecture Code Level Diagrams

#### 5.5.7.1. Bounded Context Domain Layer Class Diagrams

#### 5.5.7.2. Bounded Context Database Design Diagram

---
