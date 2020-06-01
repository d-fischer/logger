import * as isNode from 'detect-node';

enum LogLevel {
	CRITICAL,
	ERROR,
	WARNING,
	INFO,
	DEBUG,
	/** @deprecated use DEBUG instead */
	DEBUG1 = 4,
	/** @deprecated use DEBUG instead */
	DEBUG2 = 4,
	/** @deprecated use DEBUG instead */
	DEBUG3 = 4,
	TRACE = 7
}

export default LogLevel;

export function resolveLogLevel(level: string | keyof typeof LogLevel | LogLevel): LogLevel {
	if (typeof level === 'number') {
		if (Object.prototype.hasOwnProperty.call(LogLevel, level)) {
			return level;
		}
		const eligibleLevels = Object.keys(LogLevel)
			.map(k => parseInt(k, 10))
			.filter(k => !isNaN(k) && k < level);
		if (!eligibleLevels) {
			return LogLevel.WARNING;
		}
		return Math.max.apply(Math, eligibleLevels);
	}

	const strLevel = level.toUpperCase();

	if (!Object.prototype.hasOwnProperty.call(LogLevel, strLevel)) {
		throw new Error(`Unknown log level string: ${strLevel}`);
	}

	return LogLevel[strLevel];
}

export type LogLevelMap<T> = { [severity in LogLevel]: T };

// Node 8+ defines console.debug as noop, and earlier versions don't define it at all
const debugFunction = isNode ? console.log.bind(console) : console.debug.bind(console);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LogLevelToConsoleFunction: LogLevelMap<(message?: any, ...optionalParams: any[]) => void> = {
	[LogLevel.CRITICAL]: console.error.bind(console),
	[LogLevel.ERROR]: console.error.bind(console),
	[LogLevel.WARNING]: console.warn.bind(console),
	[LogLevel.INFO]: console.info.bind(console),
	[LogLevel.DEBUG]: debugFunction.bind(console),
	[LogLevel.TRACE]: console.trace.bind(console)
};
