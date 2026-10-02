# Capítulo VI: Solution UX Design

En esta sección se aborda el planteamiento integral de la propuesta de diseño de experiencia de usuario (UX) e interfaz de usuario (UI) para las aplicaciones y plataformas digitales que componen el ecosistema de AuxIA. La propuesta visual e interactiva está diseñada para respaldar directamente los flujos de trabajo clave definidos en las Historias de Usuario (*User Stories*), optimizando la toma de decisiones críticas en entornos de alta incertidumbre y estrés. Asimismo, se incorporan de manera explícita las decisiones de arquitectura de software previamente establecidas asegurando que la interfaz transmita confianza, claridad y eficiencia tanto a las autoridades de gestión de desastres como a los ciudadanos afectados.

## 6.1. Style Guidelines

Con el objetivo de garantizar una presentación visual coherente, escalable y enfocada en la usabilidad, el equipo de desarrollo ha establecido este repositorio central de pautas de estilo (*Design System*). Estas directrices unifican los activos de marca, patrones tipográficos, componentes de interfaz, esquemas cromáticos y principios de diagramación que serán utilizados por todos los diseñadores y desarrolladores del proyecto. Al centralizar estas normas, se asegura la integridad visual en todas las plataformas digitales de AuxIA (web y móvil), facilitando el desarrollo modular, acelerando la incorporación de nuevas funcionalidades y reduciendo la carga cognitiva de los usuarios en situaciones de emergencia.

### 6.1.1. General Style Guidelines

A continuación, se justifican y detallan las decisiones visuales y conceptuales que articulan el lenguaje gráfico de AuxIA, tomando como fundamento los principios de la teoría del diseño, la psicología del color, la legibilidad en pantallas y la comunicación centrada en el usuario.


#### Branding (Logo & Icon)

El ecosistema visual de AuxIA proyecta una identidad tecnológica moderna, humana y altamente funcional, orientada a transmitir seguridad y capacidad de respuesta inmediata.

<p align="center">
  <img src="../assets/style-guidelines/logo_icon.png" alt="Logo & Icon AuxIA" width="550" />
</p>

* **Isotipo (Icono):** Representa la figura estilizada de un robot o asistente inteligente. En la parte superior cuenta con una antena que simboliza la conectividad, el procesamiento algorítmico y la presencia de la Inteligencia Artificial. La expresión facial del robot muestra dos ojos y una boca redonda y abierta (destacada con un punto cromático de color), la cual emula la gestualidad humana de emitir un llamado de alerta o "pedir auxilio" ante una emergencia. El marco circular posterior otorga solidez visual, simulando el casco del asistente o la central de mando desde la que se gestiona la ayuda.
* **Logotipo:** Compuesto por la tipografía en caja baja `auxia`, lo cual aporta accesibilidad y cercanía. La construcción semántica divide visualmente la palabra: el prefijo `aux` (asociado al auxilio y soporte humano) y el sufijo `ia` (Inteligencia Artificial), destacando la sinergia entre la tecnología algorítmica y la respuesta ante emergencias.
* **Variantes y Adaptabilidad:** Como se observa en la especificación de marca, el identificador se ha adaptado a múltiples fondos de contraste (modos claro y oscuro) utilizando combinaciones de la paleta oficial (Azul Noche, Celeste, Verde Lima, Verde Esmeralda y Verde Oscuro). Esto garantiza legibilidad y reconocibilidad instantánea tanto en pantallas de escritorio en centros de mando como en dispositivos móviles bajo condiciones extremas de iluminación en campo.

---

#### Typography

Para todo el sistema digital de AuxIA se ha seleccionado la tipografía **Inter**, una familia tipográfica *sans-serif* de código abierto especialmente diseñada para interfaces de usuario en pantallas digitales.

<p align="center">
  <img src="../assets/style-guidelines/typography.png" alt="Typography AuxIA" width="550" />
</p>

* **Sustento y Justificación:**
  * **Legibilidad a Pequeña Escala:** Inter cuenta con una altura de x (*x-height*) elevada y aperturas amplias en sus caracteres, lo que previene la distorsión visual cuando la aplicación se consulta en pantallas móviles pequeñas o en dispositivos de baja resolución utilizados por brigadistas.
  * **Claridad Numérica y de Símbolos:** En la gestión de desastres, la interpretación precisa de datos numéricos (coordenadas GPS, cantidades de kits de víveres, número de personas afectadas y porcentajes de inventario) es crítica. Inter incluye numerales y caracteres especiales con un espaciado métrico neutro que evita errores de lectura.
  * **Jerarquía Tipográfica:** Se emplean diferentes pesos del conjunto tipográfico (Bold, Semibold, Medium y Regular) para establecer una jerarquía visual clara. Los pesos más gruesos (*Bold/Semibold*) se destinan a encabezados, alertas de alta urgencia y métricas clave, mientras que los pesos *Regular/Medium* se reservan para bloques de texto instructivo, tablas de datos y formularios.

---

#### Colors

La selección de la paleta cromática de AuxIA se fundamenta en la teoría del color y en la psicología aplicada a entornos de crisis, donde cada tono cumple un rol funcional para guiar la atención del usuario sin generar pánico.

<p align="center">
  <img src="../assets/style-guidelines/color_palette.png" alt="Color Palette AuxIA" width="550" />
</p>

* **Azul Noche (`#212161` | `rgb(33, 33, 97)`):** 
  * *Significado y Función:* Representa la profundidad, la estabilidad, la autoridad institucional y el rigor técnico. Se utiliza como color estructural primario para fondos de modo oscuro, barras de navegación, encabezados principales y texto de alto contraste. Transmission de serenidad y profesionalismo.
* **Azul Real (`#4750DD` | `rgb(71, 80, 221)`):**
  * *Significado y Función:* Evoca confianza, tecnología avanzada, precisión y seguridad. Funciona como color primario de marca y de acción (botones principales, componentes interactivos seleccionados y enlaces), destacando elementos de interacción sin la agresividad visual de otros tonos.
* **Celeste (`#85D5F6` | `rgb(133, 213, 246)`):**
  * *Significado y Función:* Transmite claridad, aire, tranquilidad, transparencia y esperanza. Se utiliza en estados informativos, resaltados secundarios, fondos de tarjetas (*cards*) y elementos de soporte gráfico que requieren diferenciar información sin recargar la vista.
* **Verde Oscuro (`#094542` | `rgb(9, 69, 66)`):**
  * *Significado y Función:* Asociado a la firmeza, la solidez, la resiliencia y la estabilidad del entorno. Se aplica en contenedores de datos de infraestructura, tarjetas de estado operativo y componentes estructurales secundarios en interfaces de mando.
* **Verde Esmeralda (`#05C274` | `rgb(5, 194, 116)`):**
  * *Significado y Función:* Simboliza la validación, el éxito, la seguridad y la confirmación de operaciones. Es el color principal para indicar estados de entregas completadas, registros blockchain validados, niveles óptimos de stock y confirmaciones del sistema.
* **Verde Lima (`#BCFB89` | `rgb(188, 251, 137)`):**
  * *Significado y Función:* Aporta alta visibilidad, energía vital, dinamismo y alerta positiva. Se emplea como color de acento de alto impacto (*focal point*) para llamar la atención sobre indicadores urgentes, botones de acción crítica en campo, notificaciones activas y métricas prioritarias en los tableros de control.


#### Supporting Colors (Escalas y Tonos de Soporte)

<p align="center">
  <img src="../assets/style-guidelines/supporting_colors.png" alt="Supporting Design Colors AuxIA" width="550" />
</p>

Para garantizar la flexibilidad técnica del sistema de diseño y la correcta construcción de componentes en plataformas web y móviles, la paleta principal se extiende en rampas tonales (*tints* y *shades*) derivadas de cada color base, acompañadas por una escala de neutros funcionales.

* **Sustento y Justificación:**
  * **Accesibilidad y Contraste (WCAG 2.1):** Las variantes más claras de la escala (tonos pastel e iluminados como `#E3F3FC`, `#EFF0FC` o `#C0FFD7`) se utilizan como fondos de tarjetas (*cards*), contenedores de alertas y bloques informativos. Por su parte, los tonos más oscuros y profundos (`#071E26`, `#111760`, `#0D1805`) aseguran un contraste óptimo para tipografías y bordes sobre fondos claros, garantizando la lectibilidad para usuarios con visión reducida o bajo luz solar directa en campo.
  * **Estados Interactivos y Microinteracciones:** Los matices intermedios de cada rampa permiten definir con precisión los estados dinámicos de la interfaz (reposo, *hover*, presión/*pressed*, enfoque/*focus* y deshabilitado/*disabled*) en botones, selecciones y elementos navegables sin romper la armonía cromática de la marca.
  * **Visualización de Datos y Niveles de Riesgo:** En tableros de control de desastres, los mapas de calor y los gráficos de inventario requieren gradaciones continuas para representar densidad de afectados, niveles de urgencia o disponibilidad de stock. Estas escalas tonales permiten construir visualizaciones de datos complejas e intuitivas sin necesidad de saturar la interfaz con colores disonantes.
  * **Escala Neutra Funcional (Grises):** Abarca desde el gris claro de soporte (`#E6EAE4`) hasta el gris profundo (`#141514`). Se destina a divisores de sección, bordes de formularios, estados inactivos y bloques de lectura extensa, evitando el uso del negro puro (`#000000`) para reducir el fatiga visual durante jornadas prolongadas de monitoreo.

---

#### Espaciado (Spacing & Grid)

El sistema de espaciado de AuxIA se rige por un **Grid de 8 puntos (8pt Spatial System)**, donde todas las dimensiones de márgenes, rellenos (*paddings*), distancias inter-elementos y tamaños de componentes son múltiplos de 8px (utilizando 4px de forma excepcional para micro-ajustes).

* **Sustento y Justificación:**
  * **Eficiencia de Layout y Proporción:** Permite una alineación visual armónica y predecible entre diferentes plataformas y resoluciones de pantalla.
  * **Usabilidad Táctil en Campo:** Garantiza que los objetivos de toque (*touch targets*) en la aplicación móvil tengan un tamaño mínimo de 48x48px (6 unidades de 8px). Esto es vital para las autoridades y brigadistas que operan en el campo bajo condiciones adversas, con guantes de protección o en movimiento.
  * **Reducción de Carga Cognitiva:** Un espaciado holgado e interactivo ayuda a separar con claridad la información densa (listas de damnificados, tablas de recursos, gráficos de prioridad), evitando errores de manipulación en momentos de estrés.

---

#### Tono de Comunicación y Lenguaje Aplicado

El tono de comunicación del ecosistema AuxIA ha sido calibrado en cuatro dimensiones fundamentales para adaptarse a la sensibilidad de las emergencias humanitarias y a la rigurosidad requerida por las autoridades:

[Divertido]   0 --------------------|---- 10  [Serio]           -> Posición: 9/10 <br>
[Casual]      0 ----------------|-------- 10  [Formal]          -> Posición: 7/10 <br>
[Irreverente] 0 ------------------------| 10  [Respetuoso]      -> Posición: 10/10 <br>
[Entusiasta]  0 --------------|---------- 10  [Sereno]          -> Posición: 8/10 <br>

1. **Serio vs. Divertido (9 / 10 - Orientado a lo Serio):** Dada la naturaleza de la plataforma (atención de crisis, distribución de ayuda y salvaguarda de vidas), el lenguaje descarta cualquier matiz humorístico o superfluo. Se prioriza un mensaje directo, sobrio y enfocado puramente en la resolución de problemas.
2. **Formal vs. Casual (7 / 10 - Moderadamente Formal / Profesional Accesible):** Concilia la autoridad institucional de los organismos de defensa civil con la simplicidad necesaria para el ciudadano afectado. Emplea un lenguaje técnico preciso pero exento de burocracia innecesaria, mediante frases cortas, voz activa e instrucciones claras.
3. **Respetuoso vs. Irreverente (10 / 10 - Estrictamente Respetuoso y Empático):** La comunicación demuestra consideración absoluta por la dignidad humana, la privacidad de los datos sensibles y el estado emocional de las personas en situación de vulnerabilidad.
4. **Sereno vs. Entusiasta (8 / 10 - Sereno y Asegurador):** El tono evita términos alarmistas o sensacionalistas que incrementen la ansiedad. En su lugar, transmite control, calma, certeza operativa y transparencia respecto al estado de las solicitudes y la ayuda en camino.

En cuanto al idioma utilizado para AuxIA, se propone lo siguiente:

* **Idioma Principal (Nativo):** La aplicación está concebida y desarrollada primordialmente en **Español**, garantizando una perfecta adaptación cultural, semántica y terminológica para las regiones hispanohablantes donde se desplegarán las principales operaciones de respuesta ante desastres.
* **Internacionalización (i18n - Inglés):** El sistema incorpora soporte de arquitectura para **internacionalización (i18n)**, permitiendo a los usuarios alternar la interfaz dinámicamente al **Inglés**. Esta funcionalidad asegura la interoperabilidad con brigadas internacionales, organizaciones no gubernamentales (ONG) globales y organismos multilaterales de apoyo en crisis humanitarias.


### 6.1.2. Web & Mobile Style Guidelines

En esta sección se detallan las directrices de diseño e interacción adaptadas a las plataformas **Web Responsive** y **Móvil Nativa** del ecosistema AuxIA. Dado que cada entorno responde a contextos de uso radicalmente opuestos —el trabajo estratégico en centros de mando frente a la operación de emergencia en campo—, las interfaces han sido optimizadas para ofrecer la máxima usabilidad, accesibilidad y velocidad de respuesta en sus respectivos dispositivos.

<p align="center">
  <img src="../assets/style-guidelines/web_mobile_style_guide.png" alt="AUXIA Web and Mobile Style Guide" width="700" />
</p>

#### 1. Native Mobile Interfaces (Aplicación Móvil) 

La interfaz móvil nativa está diseñada para **ciudadanos, voluntarios y brigadistas de rescate**. Su enfoque principal es la simplicidad operativa, la velocidad de ejecución bajo situaciones de estrés y el soporte nativo para capacidades del dispositivo (GPS, cámara, almacenamiento local para conectividad *offline-first*).

***A. Ergonomía y Zona del Pulgar (Thumb Zone)***
* **Distribución de Controles:** Los elementos de interacción principal (botones de emergencia, envío de reportes, confirmación de entrega) se ubican en la **Zona Natural de Alcance** (tercio inferior de la pantalla) para facilitar el uso con una sola mano.
* **Navegación Inferior (Bottom Navigation Bar):** Barra fija de 4 a 5 accesos directos principales con iconos claros de 24px y etiquetas tipográficas.
* **Hojas Inferiores (Bottom Sheets):** Se prioriza el uso de modales deslizables desde la parte inferior para formularios rápidos, detalles de incidentes y filtros, evitando diálogos flotantes centrados que obstruyan la pantalla.

***B. Tamaño de Objetivos Táctiles (Touch Targets)***
* **Dimensión Mínima:** Todos los componentes interactivos (botones, checks, iconos accionables) tienen un área mínima de toque de **48x48 px** (respetando la cuadrícula de 8pt), garantizando su accionamiento aun usando guantes de protección o en condiciones de movimiento.
* **Espaciado Mínimo:** Distancia de al menos 8px entre controles interactivos adyacentes para prevenir toques accidentales.

***C. Patrones de Interacción y Feedback Háptico***
* **Indicadores Visuales Offline-First:**
  * **Badge de Conectividad:** Un indicador discreto pero visible en la barra superior muestra el estado de conexión (*"En línea"* en Verde Esmeralda / *"Modo Offline - Guardado Local"* en Naranja de Alerta).
  * **Feedback de Sincronización:** Barra de progreso sutil cuando los datos guardados localmente se sincronizan automáticamente al recuperar la señal.
* **Respuesta Háptica (Vibración):** Confirmación táctil inmediata al enviar un reporte de emergencia, escanear un código QR de entrega o validar una transacción registrada en blockchain.

---

#### 2. Responsive Web Interfaces (Panel de Control y Centro de Mando)

La plataforma web está orientada a **autoridades de defensa civil, administradores de logística y analistas de crisis**. Diseñada para pantallas grandes, prioriza el monitoreo multivariable, el análisis de datos masivos y la toma de decisiones estratégicas.

***A. Breakpoints y Layout Adaptativo***
El sistema de retícula (*grid*) responsive para la web utiliza un modelo flexible basado en los siguientes puntos de interrupción:

* **Desktop Extra Large (≥ 1440px):** Layout de 12 columnas. Espacio optimizado para mapas GIS interactivos a pantalla completa con paneles laterales colapsables de métricas en tiempo real.
* **Desktop Standard / Laptop (1024px – 1439px):** Layout de 12 columnas. Ajuste automático de tablas de datos y reducción de paneles secundarios a pestañas navegables.
* **Tablet Horizontal / Pantallas Pequeñas (768px – 1023px):** Layout de 8 columnas. Menú lateral (Sidebar) colapsable automáticamente en un menú tipo "Hamburguesa" o riel compacto de iconos.

***B. Alta Densidad de Información y Monitoreo***
* **Tablas de Datos Avanzadas:** Soporte nativo para ordenamiento, filtrado múltiple, paginación dinámica y exportación. Filas con altura optimizada para lectura rápida y estados visuales resaltados según el nivel de prioridad de la IA.
* **Visualización de Mapas y Capas:** Controles flotantes sobre mapas interactivos para alternar capas de calor (zonas afectadas, refugios, rutas bloqueadas y flota de vehículos de auxilio).
* **Compatibilidad con Centros de Control (Modo Oscuro Predeterminado):** Opción de conmutación a tema oscuro optimizado (`#212161` Azul Noche) para pantallas de proyección continua en salas de mando, reduciendo la fatiga visual de los operadores en turnos nocturnos.

***C. Navegación por Teclado y Puntero***
* **Estados Hover y Focus Visibles:** Todos los elementos interactivos cuentan con un anillo de enfoque (*focus ring*) de alto contraste de 2px para navegación accesible mediante teclado (`Tab` / `Enter`).
* **Atajos de Teclado (Keyboard Shortcuts):** Habilitación de comandos rápidos para operadores avanzados (ej. `CTRL + F` para búsqueda global de solicitudes, `ESC` para cerrar paneles laterales).

---

#### 3. Matriz de Adaptación de Componentes (Web vs. Móvil)

Para mantener la coherencia de la marca mientras se respeta la naturaleza de cada plataforma, los componentes principales adaptan su estructura según el dispositivo:

| Componente | Comportamiento en Web (Desktop) | Comportamiento en Móvil (Native) |
| :--- | :--- | :--- |
| **Navegación Principal** | Menú lateral vertical (*Sidebar*) fijo con jerarquía expandible. | Barra de navegación inferior (*Bottom Bar*) fija con 4 a 5 secciones clave. |
| **Tablas y Listados** | Tabla de datos con múltiples columnas, ordenamiento y acciones en línea. | Tarjetas verticales (*Cards*) resumidas con detalles expandibles en *Bottom Sheet*. |
| **Formularios de Reporte** | Formularios multicolumna en modales centrados o pestañas dedicadas. | Formularios paso a paso (*Wizard*) de una sola columna con botones fijos al pie. |
| **Filtros de Búsqueda** | Barra superior de filtros desplegables y rangos de fechas visibles. | Botón flotante de filtro que despliega una hoja inferior (*Bottom Sheet*) completa. |
| **Alertas del Sistema** | Notificaciones tipo *Toast* en la esquina superior derecha con autocierre. | Banner superior (*Snackbar*) o alerta a pantalla completa para emergencias críticas. |

## 6.2. Information Architecture

### 6.2.1. Organization Systems

### 6.2.2. Labeling Systems

### 6.2.3. Searching Systems

### 6.2.4. SEO Tags and Meta Tags / ASO Elements

### 6.2.5. Navigation Systems

## 6.3. Landing Page UI Design

En esta sección se presenta la propuesta de interfaz de usuario (UI) para la landing page de AuxIA, la cual traduce de manera directa las decisiones de diseño y la arquitectura de información definidas previamente en un sistema visual cohesivo y de alto impacto. El diseño se estructura para comunicar con claridad la propuesta de valor tecnológica de la plataforma —combinando Inteligencia Artificial y trazabilidad Blockchain— a través de un esquema visual en modo oscuro que optimiza el contraste, una jerarquía tipográfica rigurosa y componentes visuales diseñados para guiar orgánicamente al usuario desde la comprensión del sistema hasta las llamadas a la acción (CTAs) clave.

### 6.3.1. Landing Page Wireframes

En esta sección se exponen los wireframes estructurales de la landing page para navegadores Web Desktop y Mobile Web Browser. La propuesta diagrama la arquitectura de información y el flujo de navegación en esquemas de baja y media fidelidad, evidenciando la aplicación de principios fundamentales de diseño UX/UI, como la jerarquía visual, la consistencia y la alineación. Asimismo, se integran criterios de diseño inclusivo y accesibilidad (adaptabilidad responsive, contraste adecuado y zonas de interacción optimizadas para pantallas táctiles), garantizando una experiencia clara, fluida e intuitiva tanto para ciudadanos en dispositivos móviles como para autoridades y organismos en entornos de escritorio.

#### Wireframe 1: Encabezado y Sección Principal (Hero Section)

<p align="center">
  <img src="../assets/landing-page-wireframes/L_01.png" alt="Wireframe 1 - Encabezado y Sección Principal" width="700" />
</p>

Este esquema define la cabecera con navegación principal, cambio de idioma (ES/EN) y botón de acceso al centro de mando. En la sección *Hero*, destaca la propuesta de valor centrada en la coordinación ante desastres mediante IA y Blockchain, acompañada de acciones clave (*CTAs*) para ver la demo del tablero y descargar la aplicación móvil. En el costado derecho, integra la visualización combinada del panel GIS web de mando y la interfaz móvil con botón SOS para reportes *offline*.

#### Wireframe 2: Indicadores de Impacto y Módulos Clave

<p align="center">
  <img src="../assets/landing-page-wireframes/L_02.png" alt="Wireframe 2 - Indicadores de Impacto y Módulos Clave" width="700" />
</p>

Este *wireframe* presenta en su parte superior una cinta con tres métricas clave (tiempo de respuesta, *Urgency Score* explicable y validación por Blockchain). A continuación, organiza una retícula de cuatro tarjetas representativas de los módulos principales para cada actor del sistema: captura de reportes *offline-first*, priorización algorítmica transparente, monitoreo multivariable GIS y trazabilidad inmutable de ayuda humanitaria.

#### Wireframe 3: Flujo del Proceso (How it Works) y Banner Institucional

<p align="center">
  <img src="../assets/landing-page-wireframes/L_03.png" alt="Wireframe 3 - Flujo del Proceso y Banner Institucional" width="700" />
</p>

La sección diagrama un flujo de trabajo estructurado en tres pasos secuenciales que explican el camino de la atención: el reporte en campo, la priorización mediante inteligencia artificial y la entrega validada del suministro. En la parte inferior, incorpora un bloque de llamada a la acción de alto impacto enfocado en captar organismos de Defensa Civil y ONGs mediante botones directos de solicitud de despliegue y contacto.

#### Wireframe 4: Pie de Página (Footer)

<p align="center">
  <img src="../assets/landing-page-wireframes/L_04.png" alt="Wireframe 4 - Pie de Página" width="700" />
</p>

Este esquema organiza el *footer* en columnas temáticas para estructurar los enlaces de Producto, Recursos y Marco Legal, incluyendo la identidad de marca y derechos reservados. Destaca de forma accesible e inclusiva un módulo de accesos rápidos a líneas telefónicas de emergencia clave (Defensa Civil, Bomberos y SAMU), ofreciendo máxima utilidad operacional para cualquier usuario en situación de crisis.

### 6.3.2. Landing Page Mock-ups

A conitnuación se presentan y detallan los mock-ups de alta fidelidad para la landing page de AuxIA. Esta propuesta traduce de manera rigurosa el Design System establecido para la plataforma, aplicando un esquema visual en modo oscuro (Dark Mode) fundamentado en tonos azul noche, acentos en verde lima y azul real para maximizar la legibilidad y transmitir la urgencia operacional propia de la gestión de crisis. A lo largo de cada componente se evidencia la aplicación de principios de jerarquía visual, diseño inclusivo y accesibilidad (WCAG 2.1), así como una arquitectura de información orientada a guiar eficientemente al usuario desde la comprensión de las capacidades clave del sistema hasta la conversión de autoridades, brigadistas y ciudadanos.

#### Mockup 1: Encabezado y Sección Principal (Hero Section)

<p align="center">
  <img src="../assets/landing-page-mockups/L_01.png" alt="Mockup 1 - Encabezado y Sección Principal de Alta Fidelidad" width="700" />
</p>

Este *mock-up* materializa la sección principal de la *landing page* aplicando el *Design System* en modo oscuro. La cabecera integra el logotipo institucional de AuxIA, navegación estructurada, selector de idioma (ES/EN) y un botón destacado de alto contraste (*Acceso Centro de Mando*) en verde lima. El *Hero* combina una tipografía de gran escala con acentos en verde para resaltar las tecnologías clave (IA y Blockchain), acompañado de dos llamadas a la acción (*CTAs*) primarias. En el costado derecho, una composición flotante contrapone la interfaz del centro de mando GIS con la app móvil en modo *offline* ("SOS 1 Toque"), evidenciando visualmente la integración multinivel entre el ciudadano en campo y las autoridades.

#### Mockup 2: Indicadores de Impacto y Módulos Clave

<p align="center">
  <img src="../assets/landing-page-mockups/L_02.png" alt="Mockup 2 - Indicadores de Impacto y Módulos Clave de Alta Fidelidad" width="700" />
</p>

Esta vista presenta los componentes de validación técnica y propuesta funcional del sistema. La cinta superior destaca tres indicadores métricos esenciales (reducción de tiempos a minutos, *Score* de Urgencia explicable y 100% de entregas verificadas) con acentos visuales en verde lima. La sección posterior organiza cuatro tarjetas modulares en retícula que representan las soluciones específicas para cada actor de la crisis (*Reportes Offline-First*, *Priorización Algorítmica*, *Panel GIS Multivariable* y *Trazabilidad Blockchain*), empleando etiquetas de categoría por rol e iconografía clara para facilitar el escaneo visual y la comprensión del producto.

#### Mockup 3: Flujo del Proceso (How it Works) y Banner Institucional

<p align="center">
  <img src="../assets/landing-page-mockups/L_03.png" alt="Mockup 3 - Flujo del Proceso y Banner Institucional de Alta Fidelidad" width="700" />
</p>

El *mock-up* ilustra la narrativa operacional de la plataforma dividida en tres fases secuenciales numeradas (*Reporte en Campo*, *Priorización e IA*, y *Despacho y Entrega Validada*), incorporando *previews* de la interfaz real en cada paso (coordenadas GPS, indicador de *Urgency Score* y código hash de validación). En la parte inferior, un banner promocional de alto impacto con fondo verde lima capta la atención de organismos de Defensa Civil y ONGs, ofreciendo botones directos de interacción (*Solicitar despliegue* y *Hablar con el equipo*) para impulsar la adopción institucional.

#### Mockup 4: Pie de Página (Footer)

<p align="center">
  <img src="../assets/landing-page-mockups/L_04.png" alt="Mockup 4 - Pie de Página de Alta Fidelidad" width="700" />
</p>

Este esquema de cierre consolida la estructura de navegación secundaria mediante columnas categóricas (*Producto*, *Recursos* y *Legal*) sobre un fondo azul/verde oscuro de tono sobrio. Aplicando principios de diseño inclusivo y utilidad operacional en situaciones de desastre, el pie de página integra un módulo de rápido acceso con las líneas telefónicas directas de emergencia nacional (Defensa Civil 115, Bomberos 116 y SAMU 106). Finalmente, la barra inferior incluye los derechos reservados y la conmutación de idioma, cerrando la experiencia de navegación con coherencia estética e institucional.

## 6.4. Applications UX/UI Design

### 6.4.1. Applications Wireframes

### 6.4.2. Applications Wireflow Diagrams

### 6.4.3 Applications Mock-ups

### 6.4.4 Applications User Flow Diagrams

## 6.5. Applications Prototyping

