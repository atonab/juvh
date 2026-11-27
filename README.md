<div align="center">

<img src="frontend/static/icon-dark.svg" width="41" alt="JUVH Logo">
<br>
<img src="frontend/static/logo-dark.svg" width="124" alt="JUVH Logo">
<br>

</div>

<div align="center">

[![CI](https://github.com/atonab/juvh/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/atonab/juvh/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/atonab/juvh?label=release&color=6b34db)](https://github.com/atonab/juvh/releases)
[![License](https://img.shields.io/github/license/atonab/juvh?color=6b34db)](LICENSE)
![Python](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Serverless_Ready-009688?logo=fastapi&logoColor=white)
![SvelteKit](https://img.shields.io/badge/SvelteKit-Svelte_5-FF3E00?logo=svelte&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## ¿Qué es JUVH?

**JUVH** nace como un proyecto moderno, para entregar una serie de herramientas *gaming* dotadas de tecnología que las herramientas actuales Open Source no tienen contemplado, inspirado en las plantillas de steam para generar reseñas servidas por API.

Este proyecto no está enfocado como tal para un despliegue local, ya que voy a buscar la manera para desplegar todos los servicios en la nube y que puedan ser consumidos de forma gratuita, sin embargo dejo una breve guía del despliegue local y la base de la arquitectura, junto con las necesidades para la contribución de desarrolladores y traductores.

[![Live App](https://img.shields.io/badge/GITHUB%20PAGES-APP-2ea44f?style=for-the-badge&logo=github&logoColor=white)](https://atonab.github.io/juvh)
[![API Docs](https://img.shields.io/badge/FASTAPI-API-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://juvh.vercel.app/docs)

---

## Plantilla de Reseñas Steam

> **Documentación del módulo:** [README](core/app/modules/review_template/README.md) · [Guía de Contribución](core/app/modules/review_template/CONTRIBUTING.md)

### Ejemplo de uso vía API (`cURL`)

Petición directa a `POST /api/v1/review-template/render` (devuelve texto plano listo para copiar; usa `/render/json` si prefieres la respuesta estructurada con el desglose del promedio):

```bash
curl -X POST "https://juvh.vercel.app/api/v1/review-template/render" \
  -H "accept: text/plain" \
  -H "Content-Type: application/json" \
  -d '{
    "template": "circles",
    "lang": "es-MX",
    "game_title": "Six Days in Fallujah",
    "comment": "Un shooter táctico brutal donde la comunicación con tu escuadra lo es todo. El sonido te pone los pelos de punta.",
    "selections": {
      "graphics": [2],
      "gameplay": [1],
      "audio": [1],
      "grind": [1],
      "story": [4],
      "price": [2],
      "bugs": [2],
      "audience": [2, 3],
      "pc_requirements": [4],
      "game_size": [4],
      "difficulty": [5],
      "duration": [3]
    },
    "manual_rating": null
  }'
```

### ¿Qué significa cada dato que envías?

- **`template`**: El estilo de iconos que quieres que lleve tu reseña (`"circles"`, `"squares"`, `"stars"` o `"diamonds"`).
- **`lang`**: El idioma en el que saldrá el texto de la plantilla (`"es-MX"` para español, `"en-US"` para inglés, etc.).
- **`game_title`**: El nombre del juego que vas a reseñar (aparece hasta arriba como título).
- **`comment`**: Tu opinión personal o veredicto final escrito con tus propias palabras.
- **`selections`**: Aquí eliges la opción que mejor describe cada apartado del juego usando el número de la lista (por ejemplo, `[1]` es la primera opción, `[2]` la segunda, y así sucesivamente). Se divide en dos grupos:
  - **Apartados que suman calificación:** Son los puntos que sí definen qué tan bueno es el juego (`graphics`, `gameplay`, `audio`, `grind`, `story`, `price`, `bugs`). La API toma tus elecciones aquí para calcular automáticamente las estrellas finales.
  - **Apartados informativos (ficha técnica):** Sirven para darle contexto a otros jugadores sin afectar la calificación final (`audience`, `pc_requirements`, `game_size`, `difficulty`, `duration`). Por ejemplo, que un juego sea muy pesado o difícil no le resta estrellas, solo avisa qué esperar. *(En `audience` puedes marcar varias opciones a la vez, como `[2, 3]`)*.
- **`manual_rating`**: Si prefieres poner tú mismo la calificación final del `0.0` al `5.0`, escríbela aquí. Si lo dejas en `null`, la herramienta saca el promedio por ti automáticamente.

---

## Sugerencias y Soporte

¿Tienes una idea para una nueva micro-app, quieres pedir una plantilla o necesitas ayuda? No necesitas saber programar:

- **[Proponer una función o pedir ayuda](https://github.com/atonab/juvh/issues/new/choose)** mediante nuestros formularios guiados.
- **[Unirte a las discusiones](https://github.com/atonab/juvh/discussions)** para compartir ideas con la comunidad.

## Contribuciones

Antes de abrir un Pull Request, revisa estos recursos:

- [Guía de Instalación](INSTALL.md) — Configuración del entorno local (`core` y `frontend`).
- [Guía Global de Contribución](CONTRIBUTING.md) — Reglas generales del proyecto y de cada módulo.
- [Licencia Apache 2.0](LICENSE) — Términos de uso, distribución y atribución.

<div align="center">

# JUVH

Creado por Atonab -  Apache-2.0 licence &copy; 2026

</div>