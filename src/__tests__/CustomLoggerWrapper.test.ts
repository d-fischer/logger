import { createLogger } from '../createLogger';

describe('custom loggers', () => {
	it('should only log messages with at least minLevel', () => {
		const custom = jest.fn();
		const logger = createLogger({
			name: 'test',
			minLevel: 'error',
			custom
		});

		logger.warn('test');
		expect(custom).not.toHaveBeenCalled();

		logger.error('test');
		logger.crit('test');
		expect(custom).toHaveBeenCalledTimes(2);
	});
});
