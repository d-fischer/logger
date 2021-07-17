import { mapOptional } from '@d-fischer/shared-utils';
import { getMinLogLevelFromEnv } from './getMinLogLevelFromEnv';
import type { Logger } from './Logger';
import type { LoggerOptions } from './LoggerOptions';
import { LogLevel, resolveLogLevel } from './LogLevel';

export interface LoggerOverrideConfig {
	log: (level: LogLevel, message: string) => void;

	// convenience overrides
	crit?: (message: string) => void;
	error?: (message: string) => void;
	warn?: (message: string) => void;
	info?: (message: string) => void;
	debug?: (message: string) => void;
	trace?: (message: string) => void;
}

export type LoggerOverride = LoggerOverrideConfig | ((level: LogLevel, message: string) => void);

export class CustomLoggerWrapper implements Logger {
	private readonly _minLevel?: LogLevel;
	private readonly _override: LoggerOverrideConfig;

	constructor({ name, minLevel, custom }: LoggerOptions) {
		this._minLevel = mapOptional(minLevel, lv => resolveLogLevel(lv)) ?? getMinLogLevelFromEnv(name);
		this._override = typeof custom === 'function' ? { log: custom } : custom!;
	}

	log(level: LogLevel, message: string): void {
		if (this._shouldLog(level)) {
			this._override.log(level, message);
		}
	}

	crit(message: string): void {
		if (!this._override.crit) {
			this.log(LogLevel.CRITICAL, message);
		} else if (this._shouldLog(LogLevel.CRITICAL)) {
			this._override.crit(message);
		}
	}

	error(message: string): void {
		if (!this._override.error) {
			this.log(LogLevel.ERROR, message);
		} else if (this._shouldLog(LogLevel.ERROR)) {
			this._override.error(message);
		}
	}

	warn(message: string): void {
		if (!this._override.warn) {
			this.log(LogLevel.WARNING, message);
		} else if (this._shouldLog(LogLevel.WARNING)) {
			this._override.warn(message);
		}
	}

	info(message: string): void {
		if (!this._override.info) {
			this.log(LogLevel.INFO, message);
		} else if (this._shouldLog(LogLevel.INFO)) {
			this._override.info(message);
		}
	}

	debug(message: string): void {
		if (!this._override.debug) {
			this.log(LogLevel.DEBUG, message);
		} else if (this._shouldLog(LogLevel.DEBUG)) {
			this._override.debug(message);
		}
	}

	trace(message: string): void {
		if (!this._override.trace) {
			this.log(LogLevel.TRACE, message);
		} else if (this._shouldLog(LogLevel.TRACE)) {
			this._override.trace(message);
		}
	}

	private _shouldLog(level: LogLevel) {
		return this._minLevel === undefined || this._minLevel <= level;
	}
}
