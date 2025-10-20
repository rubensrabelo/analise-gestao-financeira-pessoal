from api.repositories.data_repository import get_df
from api.utils import group_sum
from api.schemas import CategoryAmount


def get_sum_by_category(flow_type: str) -> list[CategoryAmount]:
    """
    Retorna a soma de valores agrupada por categoria para o tipo informado.
    """
    df = get_df()
    filtered = df[df["fluxo"] == flow_type]
    grouped = group_sum(filtered, "categoria", "valor")
    grouped = grouped.rename(
        columns={"categoria": "category", "valor": "amount"}
    )
    return grouped.to_dict(orient="records")
