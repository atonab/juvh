import json
from functools import lru_cache
from pathlib import Path
from typing import Any

LOCALES_DIR = Path(__file__).parent
DEFAULT_ES = "es-MX"
DEFAULT_EN = "en-US"


@lru_cache(maxsize=1)
def discover_locales() -> dict[str, dict[str, Any]]:
    """Escanea recursivamente los JSON de locales y registra sus metadatos y textos."""
    registry: dict[str, dict[str, Any]] = {}
    for file_path in sorted(LOCALES_DIR.rglob("*.json")):
        try:
            data = json.loads(file_path.read_text(encoding="utf-8"))
            meta = data.get("_meta", {})
            strings = data.get("strings", {})
            code = meta.get("code") or file_path.stem
            if strings:
                registry[code] = {
                    "meta": {
                        "code": code,
                        "base_lang": meta.get("base_lang", code.split("-")[0].lower()),
                        "name": meta.get("name", code),
                        "direction": meta.get("direction", "ltr"),
                    },
                    "strings": strings,
                }
        except (json.JSONDecodeError, OSError):
            continue
    return registry


def get_available_locales() -> list[dict[str, str]]:
    """Devuelve la lista de idiomas disponibles con sus metadatos para el frontend/API."""
    return [entry["meta"] for entry in discover_locales().values()]


def resolve_locale(requested_lang: str) -> tuple[str, dict[str, str]]:
    """
    Resuelve el idioma aplicando la jerarquía:
    1. Coincidencia exacta (ej. 'es-MX')
    2. Coincidencia por idioma base (ej. 'es-ES' -> 'es-MX')
    3. Fallback global: si base es 'es' o 'pt' -> 'es-MX', cualquier otro -> 'en-US'
    """
    registry = discover_locales()
    if not registry:
        return DEFAULT_ES, {}

    normalized = requested_lang.replace("_", "-").strip()
    if normalized in registry:
        return normalized, registry[normalized]["strings"]

    base = normalized.split("-")[0].lower()
    for code, entry in registry.items():
        if entry["meta"]["base_lang"].lower() == base:
            return code, entry["strings"]

    fallback_target = DEFAULT_ES if base in ("es", "pt") else DEFAULT_EN
    if fallback_target in registry:
        return fallback_target, registry[fallback_target]["strings"]

    first_code = next(iter(registry))
    return first_code, registry[first_code]["strings"]
