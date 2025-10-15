from pydantic import BaseModel


class FinancialSummary(BaseModel):
    income: float
    expense: float
    balance: float
