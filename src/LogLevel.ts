import isNode = require('detect-node');

enum LogLevel {
	CRITICAL,
	ERROR,
	WARNING,
	INFO,
	DEBUG1,
	DEBUG2,
	DEBUG3,
	TRACE
}

export default LogLevel;

export function resolveLogLevel(level: string | keyof typeof LogLevel | LogLevel): LogLevel {
	if (typeof level === 'number') {
		return level;
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

// tslint:disable-next-line:no-any
export const LogLevelToConsoleFunction: LogLevelMap<(message?: any, ...optionalParams: any[]) => void> = {
	[LogLevel.CRITICAL]: console.error.bind(console),
	[LogLevel.ERROR]: console.error.bind(console),
	[LogLevel.WARNING]: console.warn.bind(console),
	[LogLevel.INFO]: console.info.bind(console),
	[LogLevel.DEBUG1]: debugFunction.bind(console),
	[LogLevel.DEBUG2]: debugFunction.bind(console),
	[LogLevel.DEBUG3]: debugFunction.bind(console),
	[LogLevel.TRACE]: console.trace.bind(console)
};
