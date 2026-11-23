import json
from functools import lru_cache
from pathlib import Path
from typing import Any

DEFINITIONS_PATH = Path(__file__).parent / "categories_definition.json"


@lru_cache(maxsize=1)
def get_categories_definition() -> dict[str, Any]:
    return json.loads(DEFINITIONS_PATH.read_text(encoding="utf-8"))
