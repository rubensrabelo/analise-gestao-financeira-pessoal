import logging

HTTP_STATUS_LOG_LEVEL = {
    400: logging.WARNING,
    401: logging.WARNING,
    403: logging.WARNING,
    404: logging.WARNING,
    409: logging.WARNING,
    422: logging.WARNING,
    500: logging.ERROR,
    501: logging.ERROR,
    502: logging.ERROR,
    503: logging.ERROR,
    504: logging.ERROR,
}

DEFAULT_LOG_LEVEL = logging.INFO
