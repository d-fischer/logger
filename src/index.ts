import isNode = require('detect-node');
import { default as ILogger } from './Logger';
import LoggerOptions from './LoggerOptions';

const Logger: { new(options: LoggerOptions): ILogger } = isNode ? require('./NodeLogger').default : require('./BrowserLogger').default;

export default Logger;

export { default as LogLevel } from './LogLevel';
