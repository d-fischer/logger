import LogLevel, { LogLevelMap, LogLevelToConsoleFunction } from './LogLevel';
import chalk, { Chalk } from 'chalk';
import BaseLogger from './BaseLogger';

export const LogLevelToEmoji: LogLevelMap<string> = {
	[LogLevel.CRITICAL]: '\u{1F6D1}',
	[LogLevel.ERROR]: '\u{274C}',
	// these following two need extra spaces at the end because somehow they consume less space in a terminal than they should...
	[LogLevel.WARNING]: '\u{26A0}\u{FE0F} ',
	[LogLevel.INFO]: '\u{2139}\u{FE0F} ',
	[LogLevel.DEBUG1]: '\u{1F41E}',
	[LogLevel.DEBUG2]: '\u{1F41C}',
	[LogLevel.DEBUG3]: '\u{1F41B}',
	[LogLevel.TRACE]: '\u{1F43E}'
};

export const LogLevelToColor: LogLevelMap<Chalk> = {
	[LogLevel.CRITICAL]: chalk.red,
	[LogLevel.ERROR]: chalk.redBright,
	[LogLevel.WARNING]: chalk.yellow,
	[LogLevel.INFO]: chalk.blue,
	[LogLevel.DEBUG1]: chalk.magenta,
	[LogLevel.DEBUG2]: chalk.magenta,
	[LogLevel.DEBUG3]: chalk.magenta,
	[LogLevel.TRACE]: chalk.reset
};

export const LogLevelToBackgroundColor: LogLevelMap<Chalk> = {
	[LogLevel.CRITICAL]: chalk.bgRed.white,
	[LogLevel.ERROR]: chalk.bgRedBright.white,
	[LogLevel.WARNING]: chalk.bgYellow.black,
	[LogLevel.INFO]: chalk.bgBlue.white,
	[LogLevel.DEBUG1]: chalk.bgMagenta.black,
	[LogLevel.DEBUG2]: chalk.bgMagenta.black,
	[LogLevel.DEBUG3]: chalk.bgMagenta.black,
	[LogLevel.TRACE]: chalk.inverse
};

export default class NodeLogger extends BaseLogger {
	log(level: LogLevel, message: string) {
		if (level > this._minLevel) {
			return;
		}

		const logFn = LogLevelToConsoleFunction[level];

		let builtMessage = '';

		if (this._emoji) {
			const emoji = LogLevelToEmoji[level];
			builtMessage += `${emoji} `;
		}

		if (this._colors) {
			builtMessage += `${LogLevelToBackgroundColor[level](this._name)} ${LogLevelToBackgroundColor[level](LogLevel[level])} ${LogLevelToColor[level](message)}`;
		} else {
			builtMessage += `[${this._name}:${LogLevel[level].toLowerCase()}] ${message}`;
		}

		logFn(builtMessage);
	}
}
