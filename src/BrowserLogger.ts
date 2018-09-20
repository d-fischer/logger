import LogLevel, { LogLevelToConsoleFunction } from './LogLevel';
import BaseLogger from './BaseLogger';

export default class BrowserLogger extends BaseLogger {
	log(level: LogLevel, message: string) {
		if (level > this._minLevel) {
			return;
		}

		const logFn = LogLevelToConsoleFunction[level];

		logFn(`[${this._name}] ${message}`);
	}
}
