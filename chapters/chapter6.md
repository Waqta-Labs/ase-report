# Capítulo VI: Solution UX Design

En esta sección se aborda el planteamiento integral de la propuesta de diseño de experiencia de usuario (UX) e interfaz de usuario (UI) para las aplicaciones y plataformas digitales que componen el ecosistema de AuxIA. La propuesta visual e interactiva está diseñada para respaldar directamente los flujos de trabajo clave definidos en las Historias de Usuario (*User Stories*), optimizando la toma de decisiones críticas en entornos de alta incertidumbre y estrés. Asimismo, se incorporan de manera explícita las decisiones de arquitectura de software previamente establecidas asegurando que la interfaz transmita confianza, claridad y eficiencia tanto a las autoridades de gestión de desastres como a los ciudadanos afectados.

## 6.1. Style Guidelines

Con el objetivo de garantizar una presentación visual coherente, escalable y enfocada en la usabilidad, el equipo de desarrollo ha establecido este repositorio central de pautas de estilo (*Design System*). Estas directrices unifican los activos de marca, patrones tipográficos, componentes de interfaz, esquemas cromáticos y principios de diagramación que serán utilizados por todos los diseñadores y desarrolladores del proyecto. Al centralizar estas normas, se asegura la integridad visual en todas las plataformas digitales de AuxIA (web y móvil), facilitando el desarrollo modular, acelerando la incorporación de nuevas funcionalidades y reduciendo la carga cognitiva de los usuarios en situaciones de emergencia.

## 6.1.1. General Style Guidelines

A continuación, se justifican y detallan las decisiones visuales y conceptuales que articulan el lenguaje gráfico de AuxIA, tomando como fundamento los principios de la teoría del diseño, la psicología del color, la legibilidad en pantallas y la comunicación centrada en el usuario.


### Branding (Logo & Icon)

El ecosistema visual de AuxIA proyecta una identidad tecnológica moderna, humana y altamente funcional, orientada a transmitir seguridad y capacidad de respuesta inmediata.

<p align="center">
  <img src="../assets/style-guidelines/logo_icon.png" alt="Logo & Icon AuxIA" width="550" />
</p>

* **Isotipo (Icono):** Representa la figura estilizada de un robot o asistente inteligente. En la parte superior cuenta con una antena que simboliza la conectividad, el procesamiento algorítmico y la presencia de la Inteligencia Artificial. La expresión facial del robot muestra dos ojos y una boca redonda y abierta (destacada con un punto cromático de color), la cual emula la gestualidad humana de emitir un llamado de alerta o "pedir auxilio" ante una emergencia. El marco circular posterior otorga solidez visual, simulando el casco del asistente o la central de mando desde la que se gestiona la ayuda.
* **Logotipo:** Compuesto por la tipografía en caja baja `auxia`, lo cual aporta accesibilidad y cercanía. La construcción semántica divide visualmente la palabra: el prefijo `aux` (asociado al auxilio y soporte humano) y el sufijo `ia` (Inteligencia Artificial), destacando la sinergia entre la tecnología algorítmica y la respuesta ante emergencias.
* **Variantes y Adaptabilidad:** Como se observa en la especificación de marca, el identificador se ha adaptado a múltiples fondos de contraste (modos claro y oscuro) utilizando combinaciones de la paleta oficial (Azul Noche, Celeste, Verde Lima, Verde Esmeralda y Verde Oscuro). Esto garantiza legibilidad y reconocibilidad instantánea tanto en pantallas de escritorio en centros de mando como en dispositivos móviles bajo condiciones extremas de iluminación en campo.

---

### Typography

Para todo el sistema digital de AuxIA se ha seleccionado la tipografía **Inter**, una familia tipográfica *sans-serif* de código abierto especialmente diseñada para interfaces de usuario en pantallas digitales.

<p align="center">
  <img src="../assets/style-guidelines/typography.png" alt="Typography AuxIA" width="550" />
</p>

* **Sustento y Justificación:**
  * **Legibilidad a Pequeña Escala:** Inter cuenta con una altura de x (*x-height*) elevada y aperturas amplias en sus caracteres, lo que previene la distorsión visual cuando la aplicación se consulta en pantallas móviles pequeñas o en dispositivos de baja resolución utilizados por brigadistas.
  * **Claridad Numérica y de Símbolos:** En la gestión de desastres, la interpretación precisa de datos numéricos (coordenadas GPS, cantidades de kits de víveres, número de personas afectadas y porcentajes de inventario) es crítica. Inter incluye numerales y caracteres especiales con un espaciado métrico neutro que evita errores de lectura.
  * **Jerarquía Tipográfica:** Se emplean diferentes pesos del conjunto tipográfico (Bold, Semibold, Medium y Regular) para establecer una jerarquía visual clara. Los pesos más gruesos (*Bold/Semibold*) se destinan a encabezados, alertas de alta urgencia y métricas clave, mientras que los pesos *Regular/Medium* se reservan para bloques de texto instructivo, tablas de datos y formularios.

---

### Colors

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







## 6.1.2. Web, Mobile & Devices Style Guidelines

## 6.2. Information Architecture

### 6.2.1. Organization Systems

### 6.2.2. Labeling Systems

### 6.2.3. Searching Systems

### 6.2.4. SEO Tags and Meta Tags / ASO Elements

### 6.2.5. Navigation Systems

## 6.3. Landing Page UI Design

## 6.3.1. Landing Page Wireframe

## 6.3.2. Landing Page Mock-up

## 6.4. Applications UX/UI Design

## 6.4.1. Applications Wireframes

## 6.4.2. Applications Wireflow Diagrams

## 6.4.2 / 6.4.3. Applications Mock-ups

## 6.4.3 / 6.4.4. Applications User Flow Diagrams

## 6.5. Applications Prototyping

---
