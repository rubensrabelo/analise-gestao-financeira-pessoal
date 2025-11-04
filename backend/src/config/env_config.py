import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

CSV_PATH = Path(os.getenv("CSV_PATH", "uploads")).resolve()
