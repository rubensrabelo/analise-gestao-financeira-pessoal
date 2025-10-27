import yaml
from pathlib import Path


def load_log_config():
    config_path = Path(__file__).resolve().parent.parent / "config_log.yml"
    with open(config_path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)
