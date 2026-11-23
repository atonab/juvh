from . import register_template
from ..services.rating_calculator_service import VisualTheme, render_with_theme

THEME = VisualTheme(
    header_bar="••••••••••••••••••••••••••••••••••••",
    section_icon="◉",
    bullet_icon="◦",
    bar_filled="●",
    bar_half="◐",
    bar_empty="○",
    final_filled="●",
    final_half="◐",
    final_empty="○",
    divider="────────────────────────────────────",
)


@register_template(
    template_id="circles",
    label="Orbes Minimalistas (Círculos)",
    description="Indicadores circulares suaves en apartados y calificación final.",
)
def render_circles(data, evaluation: dict, locale_strings: dict) -> str:
    return render_with_theme(data, evaluation, locale_strings, THEME)
