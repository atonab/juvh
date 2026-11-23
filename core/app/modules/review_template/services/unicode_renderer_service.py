from typing import Any
from ..definitions import get_categories_definition
from ..locales import resolve_locale
from ..schemas.review_template_schema import ReviewTemplateRequest
from ..templates import discover_templates
from .rating_calculator_service import evaluate_selections


def render_unicode_template(data: ReviewTemplateRequest) -> tuple[str, dict[str, Any], str]:
    """
    Resuelve idioma, evalúa selecciones contra la definición JSON
    y aplica el tema visual de la plantilla solicitada.
    """
    resolved_lang, locale_strings = resolve_locale(data.lang)
    definition = get_categories_definition()
    evaluation = evaluate_selections(
        selections=data.selections,
        definition=definition,
        locale_strings=locale_strings,
        manual_rating=data.manual_rating,
    )
    templates = discover_templates()
    render_fn = templates[data.template]["render"]
    rendered_text = render_fn(data, evaluation, locale_strings)
    return resolved_lang, evaluation, rendered_text
