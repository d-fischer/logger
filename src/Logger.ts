import * as isNode from 'detect-node';
import { BrowserLogger } from './BrowserLogger';
import type { LoggerOptions } from './LoggerOptions';
import type { LogLevel } from './LogLevel';
import { NodeLogger } from './NodeLogger';

export interface Logger {
	log: (level: LogLevel, message: string) => void;

	// convenience
	crit: (message: string) => void;
	error: (message: string) => void;
	warn: (message: string) => void;
	info: (message: string) => void;
	debug: (message: string) => void;
	trace: (message: string) => void;
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Logger: new (options: LoggerOptions) => Logger = isNode ? NodeLogger : BrowserLogger;
