import LogLevel from './LogLevel';

export default interface LoggerOptions {
	name: string;
	minLevel?: LogLevel;
	colors?: boolean;
	emoji?: boolean;
}
