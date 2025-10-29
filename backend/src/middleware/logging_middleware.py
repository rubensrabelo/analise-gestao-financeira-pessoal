import time
from fastapi import Request
from log.factory import LoggerFactory


def create_logging_middleware(strategy="file", **kwargs):
    """
    Cria um middleware de logging que pode ser aplicado ao FastAPI.
    """
    logger = LoggerFactory.get_logger("FastAPI", strategy, **kwargs)

    async def logging_middleware(request: Request, call_next):
        start_time = time.time()
        try:
            response = await call_next(request)
            status_code = response.status_code
        except Exception as e:
            status_code = 500
            logger.exception(
                f"Erro interno durante requisição {
                    request.method
                } {
                    request.url.path
                }: {e}"
            )
            raise

        process_time = (time.time() - start_time) * 1000

        client_host = request.client.host if request.client else "unknown"
        method = request.method
        url_path = request.url.path
        query_params = dict(request.query_params)
        msg = (
            f"{method} {url_path} - {status_code} - {process_time:.2f}ms | "
            f"IP: {client_host} | Query: {query_params}"
        )

        logger.info(msg)
        return response

    return logging_middleware
