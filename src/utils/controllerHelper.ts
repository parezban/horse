import logger from '../logger';
import { Response } from 'express';

export const handleControllerError = <ErrType extends Error>(res: Response, error: ErrType, customHandlers?: Record<string, () => void>) => {
    const errorName = error.name;

    const handler = customHandlers?.[errorName];
    if (handler) {
        return handler();
    }

    logger.error(`Unexpected error: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
};
