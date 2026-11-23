import os
import socket
import uvicorn


def get_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


if __name__ == "__main__":
    port = int(os.getenv("CORE_PORT") or get_free_port())
    os.environ["CORE_PORT"] = str(port)
    print(f"JUVH | http://127.0.0.1:{port} (Docs: /docs)")
    uvicorn.run("app.main:app", host="127.0.0.1", port=port, reload=True)
