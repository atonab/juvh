from typing import Dict, List, Optional
from pydantic import BaseModel, Field, field_validator
from ..definitions import get_categories_definition
from ..templates import discover_templates


def _build_dynamic_selections_schema() -> dict:
    """Construye el ejemplo y propiedades de OpenAPI leyendo categories_definition.json."""
    definition = get_categories_definition()
    properties = {}
    example_payload = {}

    for cat in definition.get("categories", []):
        cat_id = cat["id"]
        max_opt = cat.get("option_count", 1)
        is_check = cat.get("type") == "check"
        properties[cat_id] = {
            "type": "array",
            "items": {"type": "integer", "minimum": 1, "maximum": max_opt},
            "description": f"Índices base 1 (1..{max_opt}) • {'Múltiple' if is_check else 'Único'}",
        }
        example_payload[cat_id] = [1]

    return {
        "properties": properties,
        "example": example_payload,
    }


class ReviewTemplateRequest(BaseModel):
    template: str = "minimal"
    lang: str = "es-MX"
    game_title: Optional[str] = None
    comment: Optional[str] = None
    selections: Dict[str, List[int]] = Field(
        default_factory=dict,
        json_schema_extra=_build_dynamic_selections_schema(),
    )
    manual_rating: Optional[float] = Field(default=None, ge=0.0, le=5.0)
    include_signature: bool = True

    @field_validator("template")
    @classmethod
    def validate_template_exists(cls, v: str) -> str:
        available = discover_templates()
        if v not in available:
            raise ValueError(
                f"Plantilla '{v}' no disponible. Opciones: {list(available.keys())}")
        return v


class ReviewTemplateResponse(BaseModel):
    template: str
    requested_lang: str
    resolved_lang: str
    average_rating: float
    evaluated_count: int
    total_scorable: int
    rendered: str
