# Build Stage
FROM python:3.12-slim AS build

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml uv.lock ./

RUN python -m venv /venv \
    && /venv/bin/pip install --no-cache-dir -e ".[dev]"

COPY . .

# Runtime Stage
FROM python:3.12-slim AS runtime

WORKDIR /app

COPY --from=build /venv /venv

COPY --from=build /app /app

ENV PATH="/venv/bin:$PATH"
ENV PYTHONPATH="/app/src"

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
