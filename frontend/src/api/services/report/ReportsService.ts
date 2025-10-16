import ENV from "../../../config/envConfig";
import { parseErrorResponse } from "../../utils/parseErrorResponse";
import { ReportError } from "../errors/ReportError";
import type { MetricEnum } from "../../../schemas/enums/MetricEnum";

export async function report<T = any>(metric: MetricEnum): Promise<T> {
    try {
        const response = await fetch(`${ENV.API_BASE_URL}/reports/${metric}`);

        if (!response) {
            const { message, status } = await parseErrorResponse(response);
            throw new ReportError(message, status);
        }

        return await response.json();
    } catch (error: any) {
        console.error(`Error when fetching report (${metric}):`, error);

        if (error instanceof ReportError) {
            throw error;
        }

        throw new ReportError("Unexpected error fetching report.", 500);
    }
}