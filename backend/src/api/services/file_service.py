from fastapi import UploadFile
import pandas as pd
from pathlib import Path

from api.schemas import MessageResponse
from api.services.errors import (
    validate_name_and_type,
    validate_csv_column,
    raise_database_error
)
from api.utils import create_folder, save_file
from api.repositories.data_repository import set_df
from config import CSV_PATH
from log import LoggerFactory

logger = LoggerFactory.get_logger("AppLogger")


async def upload(file: UploadFile) -> MessageResponse:
    """Faz o upload de um arquivo CSV"""
    logger.info(f"Recebido upload: {file.filename}")

    try:
        validate_name_and_type(file)
        logger.debug(f"Validação de nome e tipo concluída: {file.filename}")

        upload_dir = create_folder(Path(CSV_PATH))
        logger.debug(f"Pasta de upload definida: {upload_dir}")

        file_path = await save_file(file, upload_dir)
        logger.info(f"Arquivo salvo com sucesso em: {file_path}")

        df = pd.read_csv(file_path)
        logger.debug(f"CSV lido com sucesso: {len(df)} linhas")

        validate_csv_column(df)
        logger.debug(f"Validação das colunas concluída: {df.columns.tolist()}")

        set_df(df)
        logger.info(f"Arquivo {file.filename} persistido no repositório")

        return MessageResponse(message="File uploaded successfully.")
    except Exception as e:
        logger.error(
            f"Erro inesperado ao processar arquivo {file.filename}: {e}",
            exc_info=True
        )
        raise_database_error(e)
