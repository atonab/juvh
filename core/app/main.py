from contextlib import asynccontextmanager
import json
import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1_router import v1_router

RUNTIME_FILE = Path(__file__).resolve().parents[2] / ".runtime" / "core.json"


@asynccontextmanager
async def lifespan(app: FastAPI):
    port = os.getenv("CORE_PORT") or os.getenv("UVICORN_PORT")
    if port:
        try:
            RUNTIME_FILE.parent.mkdir(parents=True, exist_ok=True)
            RUNTIME_FILE.write_text(
                json.dumps({"host": "127.0.0.1", "port": int(port)}),
                encoding="utf-8",
            )
        except OSError:
            pass
    try:
        yield
    finally:
        try:
            if RUNTIME_FILE.exists():
                RUNTIME_FILE.unlink()
        except OSError:
            pass


app = FastAPI(
    title="JUVH Core",
    description="Núcleo modular de herramientas vitaminadas para jugadores",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_router)
