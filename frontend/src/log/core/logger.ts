import { formatLog } from "../formatter/loggerFormatter";
import { LogLevelEnum } from "../schemas/enums/LogLevelEnum";
import type { LogData } from "../schemas/interface/LogData";

class Logger {
  log(level: LogLevelEnum, message: string, context?: any) {
    const logData: LogData = { level, message, context };
    const formatted = formatLog(logData);

    switch (level) {
      case LogLevelEnum.INFO:
        console.info(formatted);
        break;
      case LogLevelEnum.WARN:
        console.warn(formatted);
        break;
      case LogLevelEnum.ERROR:
        console.error(formatted);
        break;
    }
  }

  info(message: string, context?: any) {
    this.log(LogLevelEnum.INFO, message, context);
  }

  warn(message: string, context?: any) {
    this.log(LogLevelEnum.WARN, message, context);
  }

  error(message: string, context?: any) {
    this.log(LogLevelEnum.ERROR, message, context);
  }
}

export const logger = new Logger();
