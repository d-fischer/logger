import LogLevel, { LogLevelToConsoleFunction } from './LogLevel';
import BaseLogger from './BaseLogger';

export default class BrowserLogger extends BaseLogger {
	log(level: LogLevel, message: string) {
		if (level > this._minLevel) {
			return;
		}

		const logFn = LogLevelToConsoleFunction[level];

		let formattedMessage = `[${this._name}] ${message}`;

		if (this._timestamps) {
			formattedMessage = `[${new Date().toISOString()}] ${message}`;
		}

		logFn(formattedMessage);
	}
}
