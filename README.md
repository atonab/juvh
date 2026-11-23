<div align="center">

# JUVH
### Jugadores Vitaminados con Herramientas

*Ecosistema de código abierto, moderno y modular de herramientas de alto rendimiento, sin relleno y 100% extensibles para jugadores multiplataforma.*

[![Live App](https://img.shields.io/badge/🌐_Abrir_App_en_Vivo-GitHub_Pages-2ea44f?style=for-the-badge)](https://atonab.github.io/juvh)
[![API Docs](https://img.shields.io/badge/⚡_API_Core-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](#-arquitectura-desacoplada)

![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Serverless_Ready-009688?style=flat-square&logo=fastapi&logoColor=white)
![SvelteKit](https://img.shields.io/badge/SvelteKit-Svelte_5-FF3E00?style=flat-square&logo=svelte&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Architecture](https://img.shields.io/badge/Arquitectura-Vertical_Modular-8A2BE2?style=flat-square)
![License](https://img.shields.io/badge/Open_Source-MIT-blue?style=flat-square)

</div>

---

## ¿Qué es JUVH?

**JUVH** nace como un proyecto moderno, que adopta una filosofía: **Herramientas dotadas de logica robusta**, con esto **JUVH** busca ofrecer un conjunto de aplicaciones para jugadores que buscan generar contenido limpio (como reseñas estructuradas para Steam, GOG o Discord), automatizar flujos por terminal (`curl`) o usar una interfaz web ultrarrápida sin trackers ni bloatware.
La meta es poder ofrecer este conjunto en un API para poder utilizarlo facilmente en una gran variedad de proyectos y/o utilizar la UI que se diseñó para la web.

---

## Arquitectura Desacoplada

El proyecto está dividido en dos capas independientes diseñadas para operar a **costo $0** con rendimiento óptimo:

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
├── CONTRIBUTING.md               # Reglas globales de arquitectura y desacoplamiento
└── README.md                     # Documentación principal
```

| Capa | Tecnología | Despliegue | Rol en el Ecosistema |
| :--- | :--- | :--- | :--- |
| **Frontend** | SvelteKit 5 + shadcn-svelte | **GitHub Pages** | Interfaz estática instantánea, offline-first y Mobile-First. |
| **Core API** | Python + FastAPI | **Vercel (Serverless)** | Cálculo matemático, autodescubrimiento y renderizado Unicode. |

---

## Módulos Disponibles

| Módulo | Descripción | Documentación | Guía de Contribución |
| :--- | :--- | :--- | :--- |
| **`review_template`** | Generador de reseñas Unicode con cálculo matemático normalizado ($1\dots N \rightarrow 5.0$), temas visuales intercambiables e i18n dinámico. | [README](core/app/modules/review_template/README.md) | [CONTRIBUTING](core/app/modules/review_template/CONTRIBUTING.md) |

---

## Inicio Rápido en Local

### 1. Levantar el Núcleo (`core`)
El servidor busca automáticamente un puerto libre del sistema operativo y lo publica en `.runtime/core.json`:

```bash
cd core
python -m venv .venv
source .venv/bin/activate  # En Fish: source .venv/bin/activate.fish
pip install -r requirements.txt
python run.py
```

### 2. Levantar el Frontend (`frontend`)
Vite detecta automáticamente el puerto activo en `.runtime/core.json` sin configuraciones manuales:

```bash
cd frontend
npm install
npm run dev
```

---

## Contribuciones

JUVH opera bajo **desacoplamiento estricto por módulo**. Antes de abrir un Pull Request, revisa la [Guía Global de Contribución](CONTRIBUTING.md) y la guía específica dentro de la carpeta del módulo que deseas extender.