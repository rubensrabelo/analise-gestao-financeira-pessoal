import logging
from fastapi import HTTPException

from log.factory.logger_factory import LoggerFactory
from config import HTTP_STATUS_LOG_LEVEL

logger = LoggerFactory.get_logger("AppLogger")


def raise_http_exception(status_code: int, message: str):
    """Lança uma exceção HTTP padronizada."""
    level = HTTP_STATUS_LOG_LEVEL.get(status_code, logging.INFO)
    logger.log(level, f"HTTP {status_code}: {message}")
    raise HTTPException(status_code=status_code, detail=message)
