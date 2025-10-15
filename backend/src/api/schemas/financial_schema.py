from pydantic import BaseModel


class FinancialData(BaseModel):
    month: str | None = None
    category: str | None = None
    income: float | None = None
    expense: float | None = None
    balance: float | None = None
    amount: float | None = None
