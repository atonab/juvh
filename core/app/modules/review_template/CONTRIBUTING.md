# Guía de Contribución — Módulo `review_template`

Este documento detalla cómo extender el módulo **`review_template`** sin modificar su núcleo lógico ni los esquemas de validación.

---

## 1. Agregar un Nuevo Idioma

1. Crea un archivo dentro de `locales/` siguiendo el estándar **BCP 47** (ej. `es-ES.json`, `pt-BR.json`, `fr-FR.json`).
2. Copia la estructura de `locales/es-MX.json` respetando el orden exacto de los arreglos `"options"` (ya que cada posición corresponde al índice `1..N` definido en `definitions/categories_definition.json`).
3. **No necesitas registrar el archivo en ningún sitio**: `locales/__init__.py` lo detectará automáticamente al iniciar.

---

## 2. Agregar o Modificar Apartados (`definitions/categories_definition.json`)

Cada objeto dentro de `"categories"` acepta los siguientes campos:

| Campo | Valores | Descripción |
| :--- | :--- | :--- |
| `id` | `string` | Identificador técnico único (debe coincidir con la clave en `locales/*.json`). |
| `group` | `"scorable"` \| `"specs"` | `"scorable"` entra en el cálculo de estrellas y muestra barra de progreso; `"specs"` es informativo. |
| `type` | `"radio"` \| `"check"` | Selección única (`radio`) o múltiple (`check`). |
| `order` | `"best_first"` \| `"worst_first"` | Indica si el índice `1` representa la mejor calificación o la peor (ej. Historia). |
| `option_count` | `int` | Cantidad total de opciones disponibles para el cálculo normalizado. |

---

## 3. Crear una Nueva Plantilla Visual (`templates/`)

Para añadir un nuevo diseño Unicode:

1. Crea un archivo en `templates/` terminado en `_template.py` (ej. `blocks_template.py`).
2. Define un `VisualTheme` manteniendo coherencia entre los símbolos de barra (`bar_*`) y los símbolos de cierre (`final_*`), y decóralo con `@register_template`:

```python
from . import register_template
from ..services.rating_calculator_service import VisualTheme, render_with_theme

THEME = VisualTheme(
    header_bar="▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓",
    section_icon="◈",
    bullet_icon="▸",
    bar_filled="▓",
    bar_half="▒",
    bar_empty="░",
    final_filled="▓",
    final_half="▒",
    final_empty="░",
    divider="━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
)


@register_template(
    template_id="blocks",
    label="Bloques Sombreados",
    description="Barras de densidad con bloques sombreados.",
)
def render_blocks(data, evaluation: dict, locale_strings: dict) -> str:
    return render_with_theme(data, evaluation, locale_strings, THEME)
```

3. Al reiniciar el servidor, la plantilla quedará activa en `/metadata` y `/render`.