import { Logger } from './Logger';
import type { LoggerOptions } from './LoggerOptions';

interface CustomLoggerOptions {
	custom: Logger;
}

export type LoggerOptionsOrCustom = LoggerOptions | CustomLoggerOptions;

export function createLogger(options: LoggerOptionsOrCustom): Logger {
	return 'custom' in options ? options.custom : new Logger(options);
}
