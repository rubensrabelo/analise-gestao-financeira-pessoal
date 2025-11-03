import pytest
from fastapi import UploadFile
from io import BytesIO
import pandas as pd

from api.services.file_service import upload  # type: ignore
from api.schemas import MessageResponse  # type: ignore


@pytest.mark.asyncio
async def test_upload_success(mocker):
    mocker.patch("api.services.file_service.validate_name_and_type")
    mocker.patch("api.services.file_service.validate_csv_column")
    mocker.patch("api.services.file_service.set_df")
    mocker.patch(
        "api.services.file_service.create_folder",
        return_value="/fake/path"
    )
    mocker.patch(
        "api.services.file_service.save_file",
        return_value="/fake/path/file.csv"
    )

    fake_df = pd.DataFrame({"col1": [1], "col2": [2]})
    mocker.patch("pandas.read_csv", return_value=fake_df)

    fake_file = UploadFile(
        filename="test.csv",
        file=BytesIO(b"col1,col2\n1,2")
    )

    result: MessageResponse = await upload(fake_file)

    assert isinstance(result, MessageResponse)
    assert result.message == "File uploaded successfully."


@pytest.mark.asyncio
async def test_upload_invalid_file(mocker):
    mocker.patch(
        "api.services.file_service.validate_name_and_type",
        side_effect=Exception("Invalid file")
    )

    fake_file = UploadFile(filename="bad.txt", file=BytesIO(b"data"))

    with pytest.raises(Exception):
        await upload(fake_file)


@pytest.mark.asyncio
async def test_upload_csv_read_error(mocker):
    mocker.patch("api.services.file_service.validate_name_and_type")
    mocker.patch(
        "api.services.file_service.create_folder",
        return_value="/fake/path"
    )
    mocker.patch(
        "api.services.file_service.save_file",
        return_value="/fake/path/file.csv"
    )
    mocker.patch(
        "pandas.read_csv",
        side_effect=Exception("CSV corrupt")
    )

    fake_file = UploadFile(filename="test.csv", file=BytesIO(b"fake"))

    with pytest.raises(Exception):
        await upload(fake_file)
