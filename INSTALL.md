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

## Inicio Rápido en Local

### 1. Clonar el Repositorio
Descarga el código fuente y entra al directorio del proyecto:

```bash
git clone [https://github.com/atonab/juvh.git](https://github.com/atonab/juvh.git)
cd juvh
```

### 2. Levantar el Núcleo (`core`)
El servidor busca automáticamente un puerto libre del sistema operativo y lo publica en `.runtime/core.json`:

```bash
cd core
python -m venv .venv
source .venv/bin/activate        # Bash / Zsh
# source .venv/bin/activate.fish # Fish
# .venv\Scripts\Activate.ps1     # PowerShell (Windows)
pip install -r requirements.txt
python run.py
```

### 3. Levantar el Frontend (`frontend`)
En una nueva terminal desde la raíz del proyecto, inicia el cliente web (Vite detecta automáticamente el puerto activo en `.runtime/core.json` sin configuraciones manuales):

```bash
cd frontend
npm install
npm run dev
```

<div align="center">

# JUVH

Creado por Atonab -  Apache-2.0 licence &copy; 2026

</div>