# Juego de Física (Estilo Ahorcado)

## Descripción
Este proyecto es una versión educativa del tradicional juego del ahorcado, diseñada específicamente para estudiantes y entusiastas de la física. En este juego, los jugadores intentarán adivinar palabras y términos relacionados con la física, ayudándoles a familiarizarse y reforzar su vocabulario científico. Cada término oculto está vinculado a conceptos clave de la física, desde mecánica hasta teorías cuánticas.

## Habilidades Desarrolladas
- **Conocimiento de Física:** Profundiza en términos y conceptos importantes de la física.
- **Vocabulario Científico:** Mejora la ortografía y el reconocimiento de palabras científicas.
- **Habilidades de Deducción:** Fomenta el uso del razonamiento y la lógica para descifrar palabras basadas en pistas limitadas.

## Tecnologías Utilizadas
- **React**: Framework de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción que ofrece un entorno de desarrollo rápido y una configuración simplificada.
- **TailwindCSS**: Framework de CSS para diseño rápido y responsivo.
- **HTML**: Estructura básica de la aplicación.
- **JSX**: Sintaxis utilizada junto con React para describir la interfaz de usuario.

## Configuración del Proyecto
Para configurar y correr el proyecto en tu máquina local, sigue estos pasos:

1. **Clonar el repositorio**
git clone [URL-del-repositorio]
2. **Navegar al directorio del proyecto**
cd [nombre-del-directorio]
3. **Instalar las dependencias**
npm install
4. **Instalar TailwindCSS como dependencia de desarrollo**
npm install -D tailwindcss
5. **Configurar TailwindCSS**
Añade el siguiente path en tu `tailwind.config.js` para procesar tus archivos HTML y JSX:
module.exports = {
  content: ["./src/**/*.{html,jsx}"],

};
6. Configurar estilos TailwindCSS en CSS
Añade las siguientes directivas al comienzo de tu archivo src/input.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

Iniciar el Proyecto
Para iniciar el proyecto, asegúrate de que Vite está instalado y corre el comando:
npm run dev
Este comando utilizará Vite para iniciar un servidor local para desarrollo, con soporte de hot reloading.

Cómo Jugar
Al iniciar el juego, se mostrará una palabra oculta representada por guiones bajos.
Los jugadores proponen letras para intentar revelar y completar el término correctamente.
Cada error acerca al jugador un paso más hacia la "derrota", que se representa por la gradual construcción de una estructura.
El juego termina cuando se adivina el término correctamente o se completa la estructura de errores.
