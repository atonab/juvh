import importlib
import pkgutil
from pathlib import Path
from typing import Callable, Dict, Any

TEMPLATE_REGISTRY: Dict[str, Dict[str, Any]] = {}


def register_template(template_id: str, label: str, description: str = ""):
    """Decorador para registrar automáticamente una plantilla."""
    def decorator(func: Callable):
        TEMPLATE_REGISTRY[template_id] = {
            "id": template_id,
            "label": label,
            "description": description,
            "render": func,
        }
        return func
    return decorator


def discover_templates() -> Dict[str, Dict[str, Any]]:
    """Escanea todos los archivos *_template.py en esta carpeta y los importa."""
    if not TEMPLATE_REGISTRY:
        pkg_dir = Path(__file__).parent
        for module_info in pkgutil.iter_modules([str(pkg_dir)]):
            if module_info.name.endswith("_template"):
                importlib.import_module(f"{__name__}.{module_info.name}")
    return TEMPLATE_REGISTRY
