import { LogLevel, LogLevelMap, LogLevelToConsoleFunction } from './LogLevel';
import { BaseLogger } from './BaseLogger';

export const LogLevelToEmoji: LogLevelMap<string> = {
	[LogLevel.CRITICAL]: '\u{1F6D1}',
	[LogLevel.ERROR]: '\u{274C}',
	// these following two need extra spaces at the end because somehow they consume less space in a terminal than they should...
	[LogLevel.WARNING]: '\u{26A0}\u{FE0F} ',
	[LogLevel.INFO]: '\u{2139}\u{FE0F} ',
	[LogLevel.DEBUG]: '\u{1F41E}',
	[LogLevel.TRACE]: '\u{1F43E}'
};

const colors = {
	black: 30,
	red: 31,
	green: 32,
	yellow: 33,
	blue: 34,
	magenta: 35,
	cyan: 36,
	white: 37,

	blackBright: 90,
	redBright: 91,
	greenBright: 92,
	yellowBright: 93,
	blueBright: 94,
	magentaBright: 95,
	cyanBright: 96,
	whiteBright: 97
};

const bgColors = {
	bgBlack: 40,
	bgRed: 41,
	bgGreen: 42,
	bgYellow: 43,
	bgBlue: 44,
	bgMagenta: 45,
	bgCyan: 46,
	bgWhite: 47,

	bgBlackBright: 100,
	bgRedBright: 101,
	bgGreenBright: 102,
	bgYellowBright: 103,
	bgBlueBright: 104,
	bgMagentaBright: 105,
	bgCyanBright: 106,
	bgWhiteBright: 107
};

type ColoringFunction = (str: string) => string;

function createGenericWrapper(color: number, ending: number, inner?: ColoringFunction): ColoringFunction {
	return str => `\u001B[${color}m${inner ? inner(str) : str}\u001B[${ending}m`;
}

function createColorWrapper(color: keyof typeof colors): ColoringFunction {
	return createGenericWrapper(colors[color], 39);
}

function createBgWrapper(color: keyof typeof bgColors, fgWrapper: ColoringFunction): ColoringFunction {
	return createGenericWrapper(bgColors[color], 49, fgWrapper);
}

export const LogLevelToColor: LogLevelMap<ColoringFunction> = {
	[LogLevel.CRITICAL]: createColorWrapper('red'),
	[LogLevel.ERROR]: createColorWrapper('redBright'),
	[LogLevel.WARNING]: createColorWrapper('yellow'),
	[LogLevel.INFO]: createColorWrapper('blue'),
	[LogLevel.DEBUG]: createColorWrapper('magenta'),
	[LogLevel.TRACE]: createGenericWrapper(0, 0)
};

export const LogLevelToBackgroundColor: LogLevelMap<ColoringFunction> = {
	[LogLevel.CRITICAL]: createBgWrapper('bgRed', createColorWrapper('white')),
	[LogLevel.ERROR]: createBgWrapper('bgRedBright', createColorWrapper('white')),
	[LogLevel.WARNING]: createBgWrapper('bgYellow', createColorWrapper('black')),
	[LogLevel.INFO]: createBgWrapper('bgBlue', createColorWrapper('white')),
	[LogLevel.DEBUG]: createBgWrapper('bgMagenta', createColorWrapper('black')),
	[LogLevel.TRACE]: createGenericWrapper(7, 27)
};

export class NodeLogger extends BaseLogger {
	log(level: LogLevel, message: string) {
		if (level > this._minLevel) {
			return;
		}

		const logFn = LogLevelToConsoleFunction[level];

		let builtMessage = '';

		if (this._timestamps) {
			builtMessage += `[${new Date().toISOString()}] `;
		}

		if (this._emoji) {
			const emoji = LogLevelToEmoji[level];
			builtMessage += `${emoji} `;
		}

		if (this._colors) {
			builtMessage += `${LogLevelToBackgroundColor[level](this._name)} ${LogLevelToBackgroundColor[level](
				LogLevel[level]
			)} ${LogLevelToColor[level](message)}`;
		} else {
			builtMessage += `[${this._name}:${LogLevel[level].toLowerCase()}] ${message}`;
		}

		logFn(builtMessage);
	}
}
