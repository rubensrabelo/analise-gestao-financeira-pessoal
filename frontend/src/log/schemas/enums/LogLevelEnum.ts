export const LogLevelEnum = {
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
} as const;

export type LogLevelEnum = typeof LogLevelEnum[keyof typeof LogLevelEnum];
