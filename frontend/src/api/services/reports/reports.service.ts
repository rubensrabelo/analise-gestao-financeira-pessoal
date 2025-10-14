import ENV from "../../../config/env.config";
import { parseErrorResponse } from "../../utils/parse-error.utils";
import { ReportError } from "../errors/report.error";
import type { MetricType } from "../schemas/enums/metric-type.enum";

export async function report<T = any>(metric: MetricType): Promise<T> {
    try {
        const response = await fetch(`${ENV.API_BASE_URL}/reports/${metric}`);

        if (!response) {
            const { message, status } = await parseErrorResponse(response);
            throw new ReportError(message, status);
        }

        return await response.json();
    } catch (error: any) {
        console.error(`Erro ao buscar relatório (${metric}):`, error);

        if (error instanceof ReportError) {
            throw error;
        }

        throw new ReportError("Erro inesperado ao buscar relatório.", 500);
    }
}