import type { LogData } from "../schemas/interface/LogData";

export function formatLog({ level, message, context, timestamp }: LogData) {
    const time = timestamp || new Date().toISOString();
    return `[${time}] [${level.toUpperCase()}] ${message}${context ? ` | Context: ${JSON.stringify(context)}` : ''}`;
}