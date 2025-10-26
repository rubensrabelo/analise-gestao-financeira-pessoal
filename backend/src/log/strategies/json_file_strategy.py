import logging
import json
from logging.handlers import TimedRotatingFileHandler

from .base_strategy import LogStrategy


class JSONFileLogStrategy(LogStrategy):
    """Estratégia de log em arquivo JSON com rotação automática."""
    def __init__(
            self,
            filepath: str = "/log/data/app.log",
            backup_days: int = 7
            ) -> None:
        self.filepath: str = filepath
        self.backup_days: int = backup_days

    def configure(self, logger_name: str) -> logging.Logger:
        logger = logging.getLogger(logger_name)
        if not logger.handlers:
            handler = TimedRotatingFileHandler(
                self.filepath, when="midnight",
                backupCount=self.backup_days,
                encoding="utf-8"
            )

            class JSONFormatter(logging.Formatter):
                def format(self, record):
                    log_entry = {
                        "timestamp": self.formatTime(
                            record, "%Y-%m-%d %H:%M:%S"
                        ),
                        "level": record.levelname,
                        "logger": record.name,
                        "message": record.getMessage(),
                    }
                    if record.exc_info:
                        log_entry["exception"] = self.formatException(
                            record.exc_info
                        )
                    return json.dumps(log_entry, ensure_ascii=False)

            handler.setFormatter(JSONFormatter())
            logger.addHandler(handler)
            logger.setLevel(logging.INFO)
        return logger
