from fastapi import APIRouter
from app.modules.review_template.review_template_router import router as review_template_router

v1_router = APIRouter(prefix="/api/v1")


@v1_router.get("/health", tags=["System"])
def health_check():
    return {"status": "ok", "service": "juvh-core"}


v1_router.include_router(review_template_router)
