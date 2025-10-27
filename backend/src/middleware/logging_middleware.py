import time
from fastapi import Request
from log.factory import LoggerFactory


def create_logging_middleware(strategy="file", **kwargs):
    """
    Cria um middleware de logging que pode ser aplicado diretamente ao FastAPI.
    """
    logger = LoggerFactory.get_logger("FastAPI", strategy, **kwargs)

    async def logging_middleware(request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = (time.time() - start_time) * 1000

        method = request.method
        url_path = request.url.path
        status_code = response.status_code
        msg = f"{method} {url_path} - {status_code} - {process_time:.2f}ms"

        logger.info(msg)

        return response

    return logging_middleware
