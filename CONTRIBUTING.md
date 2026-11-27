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

# Guía Global de Contribución

Gracias por tu interés en contribuir a **JUVH**. Recursos disponibles:

- [Guía de Instalación](INSTALL.md) — Configuración del entorno local (`core` y `frontend`).
- [Formularios de Issues](https://github.com/atonab/juvh/issues/new/choose) — Reporte de errores, sugerencias de micro-apps o ayuda.
- [Licencia Apache 2.0](LICENSE) — Términos de uso, distribución y atribución.

---

## Arquitectura Modular Desacoplada

1. **Autodescubrimiento sobre Hardcoding:**
   Ningún archivo del núcleo (`core`) ni de los esquemas de validación debe contener listas fijas de idiomas, categorías o variantes visuales. Todo recurso nuevo debe detectarse mediante escaneo de directorios o registros dinámicos.
2. **Aislamiento por Módulo Vertical:**
   Cada funcionalidad vive encapsulada en su propia carpeta dentro de `core/app/modules/<nombre_modulo>/` y tiene su espejo en `frontend/src/lib/modules/<nombre_modulo>/`, respetando estrictamente la estructura modular.
3. **Documentación Localizada por Módulo:**
   Para mantener el control del código y evitar mezclar reglas de negocio distintas, **cada módulo contiene su propio `README.md` y su propio `CONTRIBUTING.md`**.
4. **Cero Datos Fabricados por Defecto:**
   Los esquemas de entrada (`Pydantic`) jamás deben inyectar opiniones, selecciones o calificaciones predefinidas cuando el usuario envía una petición vacía, esta es una ética inviolable para el proyecto.
5. **Sin Puertos Fijos en Desarrollo:**
   La comunicación local entre `frontend` y `core` se resuelve dinámicamente mediante `.runtime/core.json` generado por `core/run.py`.

---

## Estructura (Core + Frontend)

```text
juvh/
├── core/                         # Motor lógico y API REST (Python + FastAPI)
│   ├── run.py                    # Arranque inteligente con asignación dinámica de puertos
│   └── app/
│       ├── api/                  # Enrutador centralizado (/api/v1)
│       └── modules/              # Módulos verticales autónomos
│           └── review_template/  # Generador Unicode de reseñas (README + CONTRIBUTING propios)
│
├── frontend/                     # Interfaz estática Mobile-First (Svelte 5 + Tailwind v4)
│   └── src/lib/modules/          # Espejo modular del backend con persistencia localStorage
│
├── CONTRIBUTING.md               # Guía de contribución
├── INSTALL.md                    # Archivo de instalación
├── LICENSE                       # Apache-2.0
├── NOTICE                        # Aviso de atribución
└── README.md                     # Documentación principal

```

| Capa | Tecnología | Despliegue | Rol en el Ecosistema |
| :--- | :--- | :--- | :--- |
| **Frontend** | SvelteKit 5 + shadcn-svelte | **GitHub Pages** | Interfaz estática instantánea, offline-first y Mobile-First. |
| **Core API** | Python + FastAPI | **Vercel (Serverless)** | Cálculo matemático, autodescubrimiento y renderizado Unicode. |

---

## Estructura Estándar de un Módulo Nuevo

```text
core/app/modules/<nuevo_modulo>/
├── definitions/          # Esquemas JSON puros (sin textos traducibles)
├── locales/              # Archivos BCP 47 (*.json) + escáner dinámico
├── schemas/              # Modelos Pydantic abiertos
├── services/             # Lógica pura y cálculos matemáticos
├── templates/            # Variantes visuales autodescubribles (si aplica)
├── <modulo>_router.py    # Endpoints FastAPI (/metadata, etc.)
├── README.md             # Documentación específica del módulo
└── CONTRIBUTING.md       # Instrucciones para extender este módulo
```

---

## Estándar Global de Internacionalización (i18n)

Todo módulo que soporte múltiples idiomas debe seguir estas reglas:

- **Nomenclatura BCP 47:** Los archivos deben nombrarse como `idioma-REGION.json` (ej. `es-MX.json`, `en-US.json`, `pt-BR.json`).

- **Estructura Raíz Obligatoria:**

  ```json
  {
    "_meta": {
      "code": "es-MX",
      "base_lang": "es",
      "name": "Español (México)",
      "direction": "ltr"
    },
    "strings": {}
  }
  ```

- **Jerarquía de Resolución (Fallback):**
  1. Coincidencia exacta (`es-MX`).
  2. Coincidencia por familia base (`es-*` $\rightarrow$ `es-MX`).
  3. Fallback global: familias `es` o `pt` resuelven a **`es-MX`**; cualquier otro idioma resuelve a **`en-US`**.

---

## Módulos Disponibles

| Módulo | Descripción | Documentación | Guía de Contribución |
| :--- | :--- | :--- | :--- |
| **`review_template`** | Plantilla y generador de reseñas con diseño **Unicode** con cálculo matemático normalizado ($1\dots N \rightarrow 5.0$), temas visuales intercambiables e i18n dinámico. | [README](core/app/modules/review_template/README.md) | [CONTRIBUTING](core/app/modules/review_template/CONTRIBUTING.md) |

---

<div align="center">

# JUVH

Creado por Atonab -  Apache-2.0 licence &copy; 2026

</div>