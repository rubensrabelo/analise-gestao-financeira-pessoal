from pathlib import Path


def ensure_upload_dir_exists(
        base_dir: Path,
        folder_name: str = "uploads"
) -> Path:
    """
    Garante que a pasta de upload exista e retorna o caminho completo.
    """
    upload_dir = base_dir / folder_name
    upload_dir.mkdir(parents=True, exist_ok=True)
    return upload_dir
