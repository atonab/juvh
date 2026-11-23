# Guía Global de Contribución — JUVH

Gracias por tu interés en contribuir a **JUVH**. Este proyecto se rige por una arquitectura **modular vertical y estrictamente desacoplada**.

---

## Principios Arquitectónicos Obligatorios

1. **Autodescubrimiento sobre Hardcoding:**
   Ningún archivo del núcleo (`core`) ni de los esquemas de validación debe contener listas fijas de idiomas, categorías o variantes visuales. Todo recurso nuevo debe detectarse mediante escaneo de directorios o registros dinámicos.
2. **Aislamiento por Módulo Vertical:**
   Cada funcionalidad vive encapsulada en su propia carpeta dentro de `core/app/modules/<nombre_modulo>/` y tiene su espejo en `frontend/src/lib/modules/<nombre_modulo>/`.
3. **Documentación Localizada por Módulo:**
   Para mantener el control del código y evitar mezclar reglas de negocio distintas, **cada módulo contiene su propio `README.md` y su propio `CONTRIBUTING.md`**.
4. **Cero Datos Fabricados por Defecto:**
   Los esquemas de entrada (`Pydantic`) jamás deben inyectar opiniones, selecciones o calificaciones predefinidas cuando el usuario envía una petición vacía.
5. **Sin Puertos Fijos en Desarrollo:**
   La comunicación local entre `frontend` y `core` se resuelve dinámicamente mediante `.runtime/core.json` generado por `core/run.py`.

---

## Estándar Global de Internacionalización (i18n)

Todo módulo que soporte múltiples idiomas debe seguir estas reglas:

* **Nomenclatura BCP 47:** Los archivos deben nombrarse como `idioma-REGION.json` (ej. `es-MX.json`, `en-US.json`, `pt-BR.json`).
* **Estructura Raíz Obligatoria:**
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
* **Jerarquía de Resolución (Fallback):**
  1. Coincidencia exacta (`es-MX`).
  2. Coincidencia por familia base (`es-*` $\rightarrow$ `es-MX`).
  3. Fallback global: familias `es` o `pt` resuelven a **`es-MX`**; cualquier otro idioma resuelve a **`en-US`**.

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