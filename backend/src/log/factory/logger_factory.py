import os

from log.strategies import ConsoleLogStrategy, JSONFileLogStrategy


class LoggerFactory:
    """Factory que cria e gerencia instâncias únicas de loggers."""
    _instances = {}

    @staticmethod
    def get_logger(name: str, strategy: str = "console", **kwargs):
        if name in LoggerFactory._instances:
            return LoggerFactory._instances[name]

        if strategy == "file":
            filepath = kwargs.get("filepath", "log/data/app.log")
            os.makedirs("log/data", exist_ok=True)
            if not os.path.exists(filepath):
                with open(filepath, "w") as f:
                    f.write("")

            logger = JSONFileLogStrategy(
                filepath=filepath,
                backup_days=kwargs.get("backup_days", 7),
            ).configure(name)
        else:
            logger = ConsoleLogStrategy().configure(name)

        LoggerFactory._instances[name] = logger
        return logger
