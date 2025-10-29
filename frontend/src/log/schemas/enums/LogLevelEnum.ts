export const LogLevelEnum = {
    INFO: "infor",
    WARN: "warn",
    ERROR: "error",
} as const;

export type LogLevelEnum = typeof LogLevelEnum[keyof typeof LogLevelEnum];