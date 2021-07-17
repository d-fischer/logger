import { Logger } from './Logger';
import type { LoggerOptions } from './LoggerOptions';
import { LogLevel } from './LogLevel';

export interface LoggerOverride {
	log: (level: LogLevel, message: string) => void;

	// convenience
	crit?: (message: string) => void;
	error?: (message: string) => void;
	warn?: (message: string) => void;
	info?: (message: string) => void;
	debug?: (message: string) => void;
	trace?: (message: string) => void;
}

interface CustomLoggerOptions {
	custom: LoggerOverride | ((level: LogLevel, message: string) => void);
}

export type LoggerOptionsOrCustom = LoggerOptions | CustomLoggerOptions;

export function createLogger(options: LoggerOptionsOrCustom): Logger {
	if ('custom' in options) {
		const custom = typeof options.custom === 'function' ? { log: options.custom } : options.custom;
		return {
			crit(msg) {
				this.log(LogLevel.CRITICAL, msg);
			},
			error(msg) {
				this.log(LogLevel.ERROR, msg);
			},
			warn(msg) {
				this.log(LogLevel.WARNING, msg);
			},
			info(msg) {
				this.log(LogLevel.INFO, msg);
			},
			debug(msg) {
				this.log(LogLevel.DEBUG, msg);
			},
			trace(msg) {
				this.log(LogLevel.TRACE, msg);
			},
			...custom
		};
	}

	return new Logger(options);
}
