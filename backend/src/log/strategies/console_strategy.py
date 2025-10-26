import logging
from .base_strategy import LogStrategy


class ConsoleLogStrategy(LogStrategy):
    """Estratégia de log no console."""
    def configure(self, logger_name) -> logging.Logger:
        logger = logging.getLogger(logger_name)
        if not logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter(
                "[%(asctime)s] [%(levelname)s] - %(name)s - %(message)s"
            )
            handler.setFormatter(formatter)
            logger.addHandler(handler)
            logger.setLevel(logging.INFO)
        return logger
