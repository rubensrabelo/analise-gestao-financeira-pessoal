import io
import pytest

@pytest.mark.asyncio
async def test_upload_csv_success(async_client):
    csv_content = b"valor,data,categoria,fluxo\n100,2024-01-01,Alimentacao,saida"
    file = {"file": ("test.csv", io.BytesIO(csv_content), "text/csv")}

    response = await async_client.post("/files/uploads", files=file)

    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "File uploaded successfully."


@pytest.mark.asyncio
async def test_upload_invalid_extension(async_client):
    file = {"file": ("bad.txt", io.BytesIO(b"test"), "text/plain")}

    response = await async_client.post("/files/uploads", files=file)

    assert response.status_code == 400  # ou 422, depende da sua validação


@pytest.mark.asyncio
async def test_upload_invalid_extension(async_client):
    file = {"file": ("bad.txt", io.BytesIO(b"test"), "text/plain")}

    response = await async_client.post("/files/uploads", files=file)

    assert response.status_code == 400  # ou 422, depende da sua validação

