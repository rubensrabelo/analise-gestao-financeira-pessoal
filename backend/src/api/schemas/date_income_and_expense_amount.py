from pydantic import BaseModel


class DateIncomeAndExpenseAmount(BaseModel):
    month: str
    income: float
    expense: float
