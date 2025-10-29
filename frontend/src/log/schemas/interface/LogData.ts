import type { LogLevelEnum } from "../enums/LogLevelEnum";

export interface LogData {
    level: LogLevelEnum;
    message: string;
    context?: Record<string, any>;
    timestamp?: string;
}