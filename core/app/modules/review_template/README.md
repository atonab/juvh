# Módulo: `review_template`

Motor generador de reseñas estructuradas en texto plano Unicode con cálculo matemático normalizado a 5 estrellas, soporte multi-idioma dinámico y múltiples temas visuales.

## Características Principales

* **Indexación Numérica ($1 \dots N$):** Las peticiones usan índices enteros base 1 en lugar de palabras clave, desacoplando completamente la lógica del idioma.
* **Cálculo Matemático Universal:** Normaliza automáticamente cualquier cantidad de opciones ($N = 2, 5, 7, 100\dots$) a escala de `0.0 – 5.0` estrellas, respetando el orden ascendente (`worst_first`) o descendente (`best_first`) de cada apartado.
* **Temas Visuales Coherentes:** Cada plantilla aplica su propia familia de símbolos Unicode (`■`/`◧`/`□`, `●`/`◐`/`○`, `★`/`⯪`/`☆`, `◆`/`⬖`/`◇`) tanto en los apartados como en el cierre de 3 líneas.
* **Metadatos en Tiempo Real:** El endpoint `GET /metadata` entrega idiomas, plantillas y categorías traducidas para alimentar interfaces dinámicas o clientes CLI.

---

## Endpoints de la API (`/api/v1/review-template`)

### 1. Consultar Metadatos (`GET /metadata`)
Devuelve los idiomas registrados, plantillas disponibles y categorías con sus opciones indexadas (`1..N`).

```bash
curl -s "http://127.0.0.1:8000/api/v1/review-template/metadata?lang=es-MX"
```

### 2. Renderizar Texto Plano (`POST /render`)
Devuelve la reseña lista para copiar y pegar en Steam, GOG o Discord:

```bash
curl -X 'POST' \
  'http://localhost:50639/api/v1/review-template/render' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{
  "template": "circles",
  "lang": "es-MX",
  "game_title": "Six Days in Fallujah",
  "comment": "Un shooter táctico brutal donde la comunicación con tu escuadra lo es todo. El sonido te pone los pelos de punta.",
  "selections": {
    "graphics": [2],
    "gameplay": [1],
    "audio": [1],
    "grind": [1],
    "story": [4],
    "price": [2],
    "bugs": [2],
    "audience": [2, 3],
    "pc_requirements": [4],
    "game_size": [4],
    "difficulty": [5],
    "duration": [3]
  },
  "manual_rating": null
}'
```

### 3. Renderizar JSON Estructurado (`POST /render/json`)
Retorna el texto renderizado junto con el promedio calculado (`average_rating`), apartados evaluados (`evaluated_count`) y total de apartados evaluables (`total_scorable`).

---

## Extender este Módulo

Consulta la [Guía de Contribución de `review_template`](CONTRIBUTING.md) para agregar nuevos idiomas, ajustar apartados o crear nuevos estilos visuales.