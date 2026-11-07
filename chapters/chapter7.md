# Capítulo VII: Product Implementation, Validation & Deployment

Este capítulo documenta cómo se configuró, implementó, probó, desplegó y validó AuxIA. La solución se reparte en seis productos digitales y cada uno tiene su propio repositorio en la organización [Waqta-Labs](https://github.com/Waqta-Labs) de GitHub: el Backend API, el AI Service, el smart contract `DeliveryRegistry`, la Landing Page, la aplicación móvil (App de Campo) y la Web App. Los datos de este capítulo (commits, pruebas, endpoints y URLs de despliegue) se tomaron de esos repositorios y de los servicios desplegados.

## 7.1. Software Configuration Management

Esta sección reúne las decisiones que mantienen consistente el trabajo del equipo durante el ciclo de vida del producto: qué herramientas usa cada integrante, cómo se organizan los repositorios y las ramas, qué convenciones sigue el código y cómo se despliega cada producto.

## 7.1.1. Software Development Environment Configuration

La tabla agrupa las herramientas por tipo de actividad. Las que funcionan como servicio (SaaS) indican su URL de acceso; las que se instalan en el computador de cada integrante indican su ruta de descarga. Las bibliotecas de cada proyecto (Spring Boot, FastAPI, Flutter, Hardhat y sus dependencias) no aparecen aquí porque las instala el gestor de paquetes de cada repositorio a partir de su archivo de configuración (`pom.xml`, `requirements.txt`, `pubspec.yaml` y `package.json`).

| Actividad | Producto | Propósito en el proyecto | Ruta de referencia o descarga |
|---|---|---|---|
| Project Management | Trello | Product Backlog y tablero del Sprint. | https://trello.com |
| Requirements Management | UXPressia | User Personas, Empathy Maps, User Task Matrix e Impact Map. | https://uxpressia.com |
| Requirements Management | Miro | As-Is y To-Be Scenario Maps, EventStorming, Candidate Context Discovery, Domain Message Flows y Bounded Context Canvases. | https://miro.com |
| Product Design | Figma | Lean UX Canvas, wireframes, wireflows, mock-ups, user flows y prototipos. | https://www.figma.com |
| Software Architecture | Structurizr Local | Diagramas C4 (landscape, context, container, component y deployment) escritos en Structurizr DSL. | https://docs.structurizr.com/local |
| Software Architecture | PlantUML | Diagramas de clases de la capa de dominio de cada bounded context. | https://plantuml.com/download |
| Software Architecture | DataGrip | Diagramas de base de datos generados sobre la base PostgreSQL de Neon. | https://www.jetbrains.com/datagrip/download |
| Software Development | IntelliJ IDEA | Desarrollo del Backend API en Spring Boot. | https://www.jetbrains.com/idea/download |
| Software Development | Visual Studio Code | Desarrollo del AI Service, del smart contract, de la Landing Page y edición del informe en Markdown. | https://code.visualstudio.com/download |
| Software Development | Android Studio y Android SDK | Compilación de la aplicación Flutter para Android y emulador para probarla. | https://developer.android.com/studio |
| Software Development | Microsoft Build of OpenJDK 21 | JDK con el que se compila y ejecuta el backend. | https://learn.microsoft.com/java/openjdk/download |
| Software Development | Python 3.12 | Entorno de ejecución del AI Service. | https://www.python.org/downloads |
| Software Development | Node.js 22 | Entorno de Hardhat para compilar, probar y desplegar el smart contract. | https://nodejs.org/en/download |
| Software Development | Flutter SDK 3.44 (Dart 3) | Framework de la aplicación móvil. | https://docs.flutter.dev/get-started/install |
| Software Development | Git y GitHub | Control de versiones, pull requests y repositorios de la organización. | https://git-scm.com/downloads y https://github.com/Waqta-Labs |
| Software Development | GitHub CLI | Creación de ramas y pull requests desde la terminal. | https://cli.github.com |
| Software Testing | Docker Desktop | Contenedores temporales de PostgreSQL 18, Azurite y Anvil que usan las pruebas de integración del backend (Testcontainers). | https://www.docker.com/products/docker-desktop |
| Software Testing | GitHub Actions | Verificación automática (formato, análisis y pruebas) de la aplicación móvil en cada pull request. | https://github.com/features/actions |
| Software Deployment | Microsoft Azure | App Service para el Backend API y el AI Service, y Blob Storage para las fotos de evidencia. | https://portal.azure.com |
| Software Deployment | Neon | Base de datos PostgreSQL 18 administrada, con un schema por bounded context. | https://neon.tech |
| Software Deployment | Vercel | Publicación de la Landing Page. | https://vercel.com |
| Software Deployment | Alchemy | Nodo RPC de la red de pruebas Sepolia. | https://www.alchemy.com |
| Software Deployment | MetaMask | Wallet de prueba que despliega el contrato y es su dueña. | https://metamask.io |
| Software Deployment | Sepolia Etherscan | Verificación del código del contrato y consulta de las transacciones de anclaje. | https://sepolia.etherscan.io |
| Software Documentation | Swagger UI (springdoc-openapi y FastAPI) | Documentación OpenAPI interactiva del Backend API y del AI Service. | https://auxia-backend.azurewebsites.net/swagger-ui.html |
| Software Documentation | Markdown en GitHub | Informe del proyecto y README de cada repositorio. | https://github.com/Waqta-Labs/ase-report |

## 7.1.2. Source Code Management

El equipo usa GitHub como plataforma de control de versiones. Cada producto tiene su repositorio dentro de la organización Waqta-Labs y todos son públicos, de modo que el historial de commits y de pull requests sirve como evidencia del trabajo de cada Sprint.

| Producto | Repositorio | Tecnología | Versión publicada |
|---|---|---|---|
| Project Report | https://github.com/Waqta-Labs/ase-report | Markdown | 0.2.0 |
| Backend API | https://github.com/Waqta-Labs/auxia-backend | Java 21, Spring Boot 4.1.2 | 0.1.1 |
| AI Service | https://github.com/Waqta-Labs/auxia-ai-service | Python 3.12, FastAPI | 0.1.0 |
| Smart contract `DeliveryRegistry` | https://github.com/Waqta-Labs/auxia-smart-contracts | Solidity 0.8.28, Hardhat 3 | 0.1.0 |
| Landing Page | https://github.com/Waqta-Labs/site | HTML5, CSS3, JavaScript | 0.1.0 |
| Aplicación móvil (App de Campo) | https://github.com/Waqta-Labs/auxia-mobile | Flutter 3.44, Dart 3 | 0.1.0 en `develop`, sin release |
| Web App | https://github.com/Waqta-Labs/auxia-web | React, Vite | Repositorio creado, sin código en esta entrega |

El repositorio del Backend API incluye, junto al código, los archivos `.feature` de las pruebas de aceptación en `src/test/resources/features/`, como pide el enunciado para los Web Services.

### GitFlow

Todos los repositorios aplican el modelo de ramas de GitFlow descrito por Driessen (2010):

| Rama | Se crea desde | Se integra en | Uso |
|---|---|---|---|
| `main` | — | — | Versiones publicadas. Solo recibe merges de `release/*` y `hotfix/*`. |
| `develop` | `main` | — | Integración del trabajo terminado. Es la rama por defecto de cada repositorio y no recibe commits directos. |
| `feature/<nombre>` | `develop` | `develop` | Una funcionalidad o una sección del informe. |
| `release/<x.y.z>` | `develop` | `main` y `develop` | Preparación de una versión. |
| `hotfix/<x.y.z>` | `main` | `main` y `develop` | Corrección urgente de una versión publicada. |
| `fix/<tema>` | `develop` | `develop` | Corrección puntual que no es una funcionalidad nueva. |

Las ramas se crean en GitHub a partir de `develop` y se integran mediante pull requests con merge commit, sin squash, para conservar los commits que este capítulo cita como evidencia. Las ramas no se borran después del merge.

Convenciones de nombres:

- **Feature branches:** `feature/` seguido de lo que se construye, en inglés y en kebab-case. Ejemplos del Sprint 1: `feature/emergency-registration`, `feature/delivery-traceability` (Backend API), `feature/urgency-score` (AI Service), `feature/delivery-registry-contract` (smart contract), `feature/landing-page` (Landing Page) y `feature/citizen-sos` (aplicación móvil). En el informe se usa `feature/chapter-<n>` para cada capítulo y `feature/chapter<n>-<tema>` para una parte de él.
- **Release branches:** `release/` seguido del número de versión, por ejemplo `release/0.1.0` y `release/0.1.1` del Backend API.
- **Hotfix branches:** `hotfix/` seguido del número de versión que corrigen. Durante el Sprint 1 no fue necesario ninguno.

Las versiones siguen Semantic Versioning 2.0.0 (Preston-Werner, s.f.) con el formato `MAJOR.MINOR.PATCH`. Mientras el producto está en desarrollo se usa la versión `0.y.z`. Cada release queda marcada con un tag `v<x.y.z>` en `main`; al cierre del Sprint 1 existen `v0.1.0` y `v0.1.1` en el Backend API y `v0.1.0` en el AI Service, el smart contract y la Landing Page.

Los mensajes de commit siguen Conventional Commits 1.0.0 (Conventional Commits, s.f.): `<type>(<scope>): <summary>`, en inglés, en imperativo y con un máximo de 72 caracteres en el título. Los tipos usados son `feat`, `fix`, `test`, `docs`, `refactor`, `perf`, `build`, `ci`, `style` y `chore`. Cada commit de los repositorios de código lleva un cuerpo que explica qué cambió y por qué; ese cuerpo es el que aparece en las tablas de evidencia de la sección 7.2.1. Ejemplos:

```text
feat: register deliveries and anchor their hash on the blockchain
test: cover the brigade suggestion rules and its endpoint
docs: document the sepolia deployment in readme
```

## 7.1.3. Source Code Style Guide & Coding Conventions

En todos los lenguajes, los nombres de paquetes, clases, métodos, variables, endpoints y mensajes de commit se escriben en inglés. Los textos que ve el usuario se traducen con archivos de internacionalización: inglés (`en_US`) y español latinoamericano (`es_419`) en el Backend API, y español e inglés en la aplicación móvil y la Landing Page.

| Lenguaje | Producto | Guía adoptada | Cómo se verifica |
|---|---|---|---|
| Java | Backend API | [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html). Paquetes por bounded context, cada uno con sus capas `domain`, `application`, `interfaces` e `infrastructure`; value objects e identificadores como `record`. | Revisión en cada pull request y `./mvnw verify`, que compila y corre todas las pruebas. |
| Python | AI Service | [PEP 8](https://peps.python.org/pep-0008/), aplicado con ruff: reglas `E`, `W`, `F`, `I`, `N`, `UP`, `B` y `SIM`, y líneas de hasta 100 caracteres. | `ruff check .` antes de cada commit. |
| Dart | Aplicación móvil | [Effective Dart](https://dart.dev/effective-dart) con `flutter_lints` y reglas adicionales en `analysis_options.yaml` (`strict-casts`, `strict-raw-types`, `prefer_final_locals`, `prefer_single_quotes`, entre otras). Archivos en `snake_case`. | `dart format` y `flutter analyze`, también en GitHub Actions. |
| Solidity | Smart contract | [Solidity Style Guide](https://docs.soliditylang.org/en/v0.8.28/style-guide.html). | `npx hardhat compile` y `npx hardhat test`. |
| HTML, CSS y JavaScript | Landing Page | [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html) y [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html). Un solo `h1`, regiones `header`, `nav`, `main`, `section` y `footer`, atributos ARIA y contraste WCAG 2.1 AA. | Revisión en cada pull request en 390, 768, 1024 y 1440 px de ancho. |
| Gherkin | Backend API | [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/) y las convenciones de escritura de SpecFlow. | Cucumber ejecuta los archivos con `./mvnw verify`. |

Convenciones de los archivos `.feature`:

- Un archivo por user story o technical story, con el nombre `usNN_<tema>.feature` o `tsNN_<tema>.feature`.
- Se escriben en español con `# language: es`, de modo que las palabras clave son `Característica`, `Antecedentes`, `Escenario`, `Dado`, `Cuando`, `Entonces` e `Y`.
- La `Característica` repite el identificador, el título y la descripción de la historia del capítulo III, y cada `Escenario` corresponde a uno de sus criterios de aceptación.
- Los pasos se redactan en tercera persona y en presente, sin referencias a la interfaz, con datos del ejemplo del informe (la emergencia "Huaico Chosica 2026" y la zona "Sector Alto Perú").

Convenciones de las APIs:

- Recursos en plural y en kebab-case bajo el prefijo `/api/v1` (por ejemplo, `/api/v1/emergencies/{emergencyId}/zones`).
- Los errores del Backend API siguen el formato *problem details* del RFC 9457 (`application/problem+json`). Los del AI Service usan un formato único `{ "code", "message", "details" }`.
- Las validaciones responden 400, un recurso inexistente 404, una acción no permitida en el estado actual 409 y una regla de negocio incumplida 422.

## 7.1.4. Software Deployment Configuration

Cada producto se publica en la plataforma que corresponde a su tecnología. El Backend API y el AI Service corren en Azure App Service, la base de datos en Neon, las evidencias en Azure Blob Storage, el contrato en la red de pruebas Sepolia y la Landing Page en Vercel.

| Producto | Plataforma | URL |
|---|---|---|
| Backend API | Azure App Service | https://auxia-backend.azurewebsites.net/api/v1 (Swagger UI en `/swagger-ui.html`) |
| AI Service | Azure App Service | https://auxia-ai-service.azurewebsites.net (Swagger UI en `/docs`) |
| Base de datos | Neon (PostgreSQL 18) | Acceso privado desde el Backend API |
| Evidencias de entrega | Azure Blob Storage | Contenedor privado `evidences` |
| Smart contract `DeliveryRegistry` | Ethereum Sepolia | https://sepolia.etherscan.io/address/0xe678347E182cbf00031401C97284AaB1C6b8148c |
| Landing Page | Vercel | https://site-two-mu-26.vercel.app |

### Backend API

1. **Base de datos.** El proyecto de Neon aloja los cinco schemas del capítulo V (`emergency_management`, `resource_management`, `traceability`, `identity_access` y `citizen_transparency`). Flyway aplica las migraciones al iniciar la aplicación y Hibernate solo valida el mapeo (`ddl-auto: validate`), así que el esquema nunca cambia sin una migración versionada.
2. **Almacenamiento.** Se crea una cuenta de Azure Storage. La aplicación crea el contenedor `evidences` la primera vez que guarda un archivo.
3. **App Service.** Se crea un App Service de Linux con el stack Java 21.
4. **Variables de entorno.** En la configuración del App Service se registran `SPRING_PROFILES_ACTIVE=prod` y las variables que lista el README del repositorio: conexión a Neon (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`), AI Service (`AI_SERVICE_URL`, `AI_SERVICE_API_KEY`), seguridad (`AUTH_JWT_SECRET`, `PLATFORM_ADMIN_KEY`), almacenamiento (`AZURE_STORAGE_CONNECTION_STRING`), blockchain (`BLOCKCHAIN_RPC_URL`, `BLOCKCHAIN_PRIVATE_KEY`), correo (`MAIL_*`), SINPAD (`SINPAD_*`) y orígenes permitidos (`CORS_ALLOWED_ORIGINS`). Ningún secreto se guarda en el repositorio.
5. **Construcción y publicación.** Desde la rama `main` se genera el JAR con `./mvnw clean package` y se publica en el App Service.
6. **Comprobación.** El sondeo de salud de la plataforma usa `/actuator/health/liveness`, que no despierta a la base de datos de Neon cuando la API está inactiva. La documentación queda disponible en `/swagger-ui.html`.

### AI Service

1. Se crea un App Service de Linux con el stack Python 3.12.
2. Se registra la variable `AI_SERVICE_API_KEY`, la misma que usa el Backend API. Sin ella el servicio no inicia.
3. Se publica el código de la rama `main`; la plataforma instala las dependencias de `requirements.txt`.
4. El comando de inicio es `uvicorn app.main:app --host 0.0.0.0 --port 8000`.
5. La comprobación usa `GET /health`, que no exige API key. Los demás endpoints solo responden al Backend API, que envía la clave en el header `X-API-Key`.

### Smart contract `DeliveryRegistry`

1. Se crea una wallet de prueba en MetaMask y se obtiene SepoliaETH de un faucet. Esa wallet queda como dueña del contrato y es la que usa el Backend API para registrar entregas.
2. Se crea una aplicación de Sepolia en Alchemy para obtener la URL RPC y una API key de Etherscan.
3. Se completan `PRIVATE_KEY`, `RPC_URL` y `ETHERSCAN_API_KEY` en el archivo `.env` local, que no se sube al repositorio.
4. Se despliega con `npx hardhat run scripts/deploy.js --network sepolia`. El script guarda la dirección, la red, el bloque y el ABI en `deployments/sepolia.json`, archivo que sí se versiona.
5. Se verifica el código fuente en Etherscan con `npx hardhat verify --network sepolia <dirección>`.
6. La dirección del contrato se registra en `BLOCKCHAIN_CONTRACT_ADDRESS` del Backend API.

### Landing Page

La Landing Page es un sitio estático (HTML, CSS y JavaScript) sin paso de construcción. El proyecto de Vercel toma los archivos del repositorio `site` y los publica tal como están.

### Aplicación móvil

La aplicación Android se genera con `flutter build apk --release --dart-define=API_BASE_URL=https://auxia-backend.azurewebsites.net`. La URL del backend se define al compilar, por lo que el mismo código puede apuntar a otro entorno sin cambios.

### Deployment Diagram

El Deployment Diagram del capítulo IV muestra los mismos nodos: el navegador con la Landing Page y la Web App, el dispositivo móvil con la App de Campo, el Backend API y el AI Service en nodos separados de la nube, PostgreSQL y el almacenamiento de evidencias.

<p align="center">
  <img src="../assets/software-architecture-diagrams/deployment-diagram.png" alt="Deployment Diagram de AuxIA" width="800">
</p>

## 7.2. Solution Implementation

## 7.2.1. Sprint 1

## 7.2.1.1. Sprint Planning 1

## 7.2.1.2. Sprint Backlog 1

## 7.2.1.3. Development Evidence for Sprint Review

## 7.2.1.4. Testing Suite Evidence for Sprint Review

## 7.2.1.5. Execution Evidence for Sprint Review

## 7.2.1.6. Services Documentation Evidence for Sprint Review

## 7.2.1.7. Software Deployment Evidence for Sprint Review

## 7.2.1.8. Team Collaboration Insights during Sprint

## 7.3. Validation Interviews

## 7.3.1. Diseño de Entrevistas

## 7.3.2. Registro de Entrevistas

## 7.3.3. Evaluaciones según heurísticas

## 7.4. Video About-the-Product
