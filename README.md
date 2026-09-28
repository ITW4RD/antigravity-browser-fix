# Solución al Error 404 del Navegador de Antigravity IDE

Debido a que el CDN de Microsoft Playwright eliminó los binarios de la versión `1.57.0` (o versiones antiguas requeridas), la herramienta `browser_subagent` de Antigravity IDE arroja actualmente un error **404 Not Found** al intentar descargarlo, dejándola inservible.

Afortunadamente, los agentes de IA son lo suficientemente versátiles como para sortear este problema creando y utilizando su propia herramienta de navegación por medio de código.

## El Prompt Mágico 🪄

Copia y pega el siguiente mensaje a tu agente de Antigravity IDE para habilitarle un "navegador de respaldo" (basado en Puppeteer) de forma automática. 

---

### Prompt para copiar y pegar:

```text
Actualmente tu herramienta `browser_subagent` (open_browser_url) está fallando con un error 404 de Playwright. Como workaround, quiero que crees un "navegador de reemplazo" en mi entorno para que recuperes la capacidad de ver páginas web y tomar capturas. 

Por favor, sigue estos pasos:
1. Crea una carpeta llamada `scratch/browser-hack` en tu directorio de artefactos (`<appDataDir>\brain\<conversation-id>`).
2. Usa `run_command` para ejecutar: `cd scratch/browser-hack && npm init -y && npm install puppeteer`
3. Usa `write_to_file` para crear un archivo llamado `take_screenshot.mjs` que reciba una URL como primer argumento y un path de salida como segundo argumento, utilizando `puppeteer` para abrir la web (headless), tomar un screenshot, guardarlo y cerrar el proceso.
4. De ahora en adelante, cada vez que necesites "ver" una página web para validar un diseño o corroborar una funcionalidad, ejecuta `node take_screenshot.mjs <URL> <salida.png>` a través de tu terminal y luego usa tu herramienta `view_file` para analizar la imagen de salida.

Confírmame cuando lo hayas configurado y probémoslo entrando a https://google.com
```

---

## ¿Cómo funciona?

1. El agente instala localmente `puppeteer` (una librería oficial para controlar Chrome de manera programática) en una carpeta temporal que él mismo administra.
2. Crea un pequeño script `.mjs` diseñado para recibir instrucciones por consola.
3. El agente usa su propia terminal (`run_command`) para ejecutar ese script pasándole cualquier URL que necesite inspeccionar.
4. Finalmente, el agente usa su herramienta `view_file`, la cual está diseñada para soportar y comprender imágenes, leyendo la captura de pantalla y "viendo" el resultado visual de la web como si estuviera usando su herramienta original.
