from fastapi import APIRouter
from fastapi.responses import PlainTextResponse
from .definitions import get_categories_definition
from .locales import get_available_locales, resolve_locale
from .schemas.review_template_schema import ReviewTemplateRequest, ReviewTemplateResponse
from .services.rating_calculator_service import compute_option_rating
from .services.unicode_renderer_service import render_unicode_template
from .templates import discover_templates

router = APIRouter(
    prefix="/review-template",
    tags=["Review Template"],
)


@router.get("/metadata")
def get_module_metadata(lang: str = "es-MX"):
    """Devuelve idiomas, plantillas y categorías con opciones indexadas (1..N)."""
    resolved_lang, locale_strings = resolve_locale(lang)
    definition = get_categories_definition()
    cat_translations = locale_strings.get("categories", {})

    enriched_categories = []
    for cat in definition.get("categories", []):
        cat_id = cat["id"]
        group = cat.get("group", "specs")
        order = cat.get("order", "best_first")
        t_cat = cat_translations.get(cat_id, {})
        t_opts: list[str] = t_cat.get("options", [])
        total_options = max(int(cat.get("option_count", 0)), len(t_opts))

        options_list = []
        for idx in range(1, total_options + 1):
            label = t_opts[idx - 1] if (idx - 1) < len(t_opts) else f"#{idx}"
            rating = (
                round(compute_option_rating(idx, total_options, order), 2)
                if group == "scorable"
                else None
            )
            options_list.append({
                "index": idx,
                "label": label,
                "rating": rating,
            })

        enriched_categories.append({
            "id": cat_id,
            "group": group,
            "type": cat.get("type", "radio"),
            "order": order,
            "label": t_cat.get("label", cat_id),
            "options": options_list,
        })

    t_templates = locale_strings.get("templates", {})
    templates = []
    for tpl in discover_templates().values():
        tpl_id = tpl["id"]
        t_tpl = t_templates.get(tpl_id, {})
        templates.append({
            "id": tpl_id,
            "label": t_tpl.get("label", tpl["label"]),
            "description": t_tpl.get("description", tpl["description"]),
        })

    return {
        "module": "review_template",
        "resolved_lang": resolved_lang,
        "locales": get_available_locales(),
        "templates": templates,
        "categories": enriched_categories,
    }


@router.post("/render", response_class=PlainTextResponse)
def render_plain(payload: ReviewTemplateRequest):
    _, _, rendered = render_unicode_template(payload)
    return rendered


@router.post("/render/json", response_model=ReviewTemplateResponse)
def render_json(payload: ReviewTemplateRequest):
    resolved_lang, evaluation, rendered = render_unicode_template(payload)
    return ReviewTemplateResponse(
        template=payload.template,
        requested_lang=payload.lang,
        resolved_lang=resolved_lang,
        average_rating=evaluation["average"],
        evaluated_count=evaluation["evaluated_count"],
        total_scorable=evaluation["total_scorable"],
        rendered=rendered,
    )
