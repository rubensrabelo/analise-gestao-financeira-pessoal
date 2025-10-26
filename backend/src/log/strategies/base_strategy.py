import logging
from abc import ABC, abstractmethod


class LogStrategy(ABC):
    """
    'Interface' base para diferentes estratégias de logging.
    """
    @abstractmethod
    def configure(self, logger_name: str) -> logging.Logger:
        ...
