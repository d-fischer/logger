/* eslint-disable filenames/match-exported */
import * as isNode from 'detect-node';
import { Logger as ILogger } from './Logger';
import { LoggerOptions } from './LoggerOptions';

import { NodeLogger } from './NodeLogger';
import { BrowserLogger } from './BrowserLogger';

const Logger: new (options: LoggerOptions) => ILogger = isNode ? NodeLogger : BrowserLogger;
// eslint-disable-next-line @typescript-eslint/no-redeclare
type Logger = ILogger;

export { Logger };

export { LogLevel } from './LogLevel';

export { LoggerOptions };
