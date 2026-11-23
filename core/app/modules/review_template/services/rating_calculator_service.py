import os
import textwrap
from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class VisualTheme:
    header_bar: str
    section_icon: str
    bullet_icon: str
    bar_filled: str
    bar_half: str
    bar_empty: str
    final_filled: str
    final_half: str
    final_empty: str
    divider: str
    quote_open: str = "❝"
    quote_close: str = "❞"


def compute_option_rating(
    index_1_based: int,
    total_options: int,
    order: str = "best_first",
    max_stars: float = 5.0,
) -> float:
    """
    Calcula dinámicamente la calificación normalizada (0.0 a 5.0) para cualquier
    cantidad de opciones N (1, 2, 5, 6, 23, 100...) usando índice base 1.
    """
    if total_options <= 1:
        return max_stars

    clamped_idx = max(1, min(index_1_based, total_options))
    if order == "worst_first":
        ratio = (clamped_idx - 1) / (total_options - 1)
    else:
        ratio = (total_options - clamped_idx) / (total_options - 1)

    return round(ratio * max_stars, 4)


def render_meter(rating: float, filled: str, half: str, empty: str, max_slots: int = 5) -> str:
    clamped = max(0.0, min(float(rating), float(max_slots)))
    full = int(clamped)
    rem = clamped - full

    has_half = False
    if rem >= 0.75:
        full += 1
    elif rem >= 0.25:
        has_half = True

    empties = max(0, max_slots - full - (1 if has_half else 0))
    return f"{filled * full}{half if has_half else ''}{empty * empties}"


def evaluate_selections(
    selections: dict[str, list[int]],
    definition: dict[str, Any],
    locale_strings: dict[str, Any],
    manual_rating: float | None = None,
) -> dict[str, Any]:
    """
    Evalúa índices base 1 contra la definición de categorías y traduce
    automáticamente cada índice con el arreglo de opciones del idioma activo.
    """
    cat_translations = locale_strings.get("categories", {})
    scorable_items: list[dict[str, Any]] = []
    spec_items: list[dict[str, Any]] = []
    earned_points: list[float] = []
    total_scorable_available = 0

    for category in definition.get("categories", []):
        cat_id = category["id"]
        group = category.get("group", "specs")
        order = category.get("order", "best_first")
        is_scorable = group == "scorable"
        if is_scorable:
            total_scorable_available += 1

        t_cat = cat_translations.get(cat_id, {})
        cat_label = t_cat.get("label", cat_id)
        t_opts: list[str] = t_cat.get("options", [])
        total_options = max(int(category.get("option_count", 0)), len(t_opts))

        selected_indices = selections.get(cat_id, [])
        if not selected_indices or total_options <= 0:
            continue

        chosen_labels: list[str] = []
        chosen_ratings: list[float] = []

        for idx in selected_indices:
            if not isinstance(idx, int) or idx < 1 or idx > total_options:
                continue
            label_text = t_opts[idx -
                                1] if (idx - 1) < len(t_opts) else f"#{idx}"
            chosen_labels.append(label_text)

            if is_scorable:
                chosen_ratings.append(
                    compute_option_rating(idx, total_options, order))

        if not chosen_labels:
            continue

        if is_scorable and chosen_ratings:
            cat_rating = sum(chosen_ratings) / len(chosen_ratings)
            earned_points.append(cat_rating)
            scorable_items.append({
                "id": cat_id,
                "label": cat_label,
                "value_text": ", ".join(chosen_labels),
                "rating": round(cat_rating, 2),
            })
        else:
            spec_items.append({
                "id": cat_id,
                "label": cat_label,
                "value_text": ", ".join(chosen_labels),
            })

    evaluated_count = len(earned_points)
    if manual_rating is not None:
        average = round(max(0.0, min(float(manual_rating), 5.0)), 1)
        is_manual = True
    elif evaluated_count > 0:
        average = round(sum(earned_points) / evaluated_count, 1)
        is_manual = False
    else:
        average = 0.0
        is_manual = False

    return {
        "average": average,
        "evaluated_count": evaluated_count,
        "total_scorable": total_scorable_available,
        "is_manual": is_manual,
        "scorable_items": scorable_items,
        "spec_items": spec_items,
    }


def render_with_theme(
    data: Any,
    evaluation: dict[str, Any],
    locale_strings: dict[str, Any],
    theme: VisualTheme,
) -> str:
    ui = locale_strings.get("ui", {})
    title = data.game_title.upper() if data.game_title else ui.get(
        "default_title", "REVIEW")
    lines: list[str] = []

    lines.extend([
        theme.header_bar,
        f"  {title}",
        theme.header_bar,
    ])

    if data.comment and data.comment.strip():
        wrapped = textwrap.wrap(data.comment.strip(), width=54)
        lines.append("")
        for idx, line in enumerate(wrapped):
            prefix = f"{theme.quote_open} " if idx == 0 else "  "
            suffix = f" {theme.quote_close}" if idx == len(wrapped) - 1 else ""
            lines.append(f"{prefix}{line}{suffix}")

    if evaluation["scorable_items"]:
        lines.extend(
            ["", f"{theme.section_icon} {ui.get('evaluated_section', 'EVALUATION')}"])
        for item in evaluation["scorable_items"]:
            meter = render_meter(
                item["rating"],
                theme.bar_filled,
                theme.bar_half,
                theme.bar_empty,
            )
            lines.append(
                f"  {theme.bullet_icon} {item['label']:<18} [ {meter} ] {item['value_text']}")

    if evaluation["spec_items"]:
        lines.extend(
            ["", f"{theme.section_icon} {ui.get('specs_section', 'SPECS')}"])
        for item in evaluation["spec_items"]:
            lines.append(
                f"  {theme.bullet_icon} {item['label']:<18} {item['value_text']}")

    final_meter = render_meter(
        evaluation["average"],
        theme.final_filled,
        theme.final_half,
        theme.final_empty,
    )
    if evaluation["is_manual"]:
        basis_text = ui.get("manual_rating", "Custom rating")
    else:
        basis_tpl = ui.get(
            "based_on", "Based on {evaluated}/{total} categories")
        basis_text = basis_tpl.format(
            evaluated=evaluation["evaluated_count"],
            total=evaluation["total_scorable"],
        )

    lines.extend([
        "",
        theme.divider,
        f"  ★ {ui.get('final_rating', 'FINAL RATING')}: {evaluation['average']:.1f} / 5.0",
        f"  {final_meter}",
        f"  {basis_text}",
        theme.divider,
    ])

    project_url = os.getenv("JUVH_PUBLIC_URL", "https://atonab.github.io/juvh")
    if getattr(data, "include_signature", True) and project_url:
        sig_tpl = ui.get("signature", "⚡ Built with JUVH • {url}")
        lines.append(f"  {sig_tpl.format(url=project_url)}")

    return "\n".join(lines)
