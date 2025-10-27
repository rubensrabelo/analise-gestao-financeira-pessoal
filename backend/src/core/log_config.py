from fastapi import FastAPI
from config import load_log_config
from middleware import create_logging_middleware
from log.factory import LoggerFactory


def log_config(app: FastAPI):
    """Configura o sistema de logs da aplicação."""
    config = load_log_config()
    log_conf = config["logging"]

    app.middleware("http")(
        create_logging_middleware(
            strategy=log_conf["strategy"],
            filepath=log_conf["file"],
            backup_days=log_conf["backup_days"]
        )
    )

    logger = LoggerFactory.get_logger(
        "AppLogger",
        strategy=log_conf["strategy"],
        filepath=log_conf["file"],
        backup_days=log_conf["backup_days"],
    )

    return logger
