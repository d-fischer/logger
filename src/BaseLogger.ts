import LoggerOptions from './LoggerOptions';
import LogLevel from './LogLevel';
import Logger from './Logger';

export default abstract class BaseLogger implements Logger {
	protected readonly _name: string;
	protected readonly _minLevel: LogLevel;
	protected readonly _emoji: boolean;
	protected readonly _colors: boolean;

	// noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected NO IT CAN'T
	constructor({ name, minLevel = LogLevel.WARNING, emoji = false, colors = true }: LoggerOptions) {
		this._name = name;
		this._minLevel = minLevel;
		this._emoji = emoji;
		this._colors = colors;
	}

	abstract log(level: LogLevel, message: string): void;

	// region convenience methods
	crit(message: string) {
		this.log(LogLevel.CRITICAL, message);
	}

	critical(message: string) {
		this.log(LogLevel.CRITICAL, message);
	}

	err(message: string) {
		this.log(LogLevel.ERROR, message);
	}

	error(message: string) {
		this.log(LogLevel.ERROR, message);
	}

	warn(message: string) {
		this.log(LogLevel.WARNING, message);
	}

	warning(message: string) {
		this.log(LogLevel.WARNING, message);
	}

	info(message: string) {
		this.log(LogLevel.INFO, message);
	}

	debug(message: string) {
		this.log(LogLevel.DEBUG1, message);
	}

	debug1(message: string) {
		this.log(LogLevel.DEBUG1, message);
	}

	debug2(message: string) {
		this.log(LogLevel.DEBUG2, message);
	}

	debug3(message: string) {
		this.log(LogLevel.DEBUG3, message);
	}

	trace(message: string) {
		this.log(LogLevel.TRACE, message);
	}
	// endregion
}
