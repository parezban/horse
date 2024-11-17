import logger from '../logger';
import { Response } from 'express';
import { createHorseSchema } from '../validation/horseValidation';
import Joi from 'joi';

export const handleControllerError = <ErrType extends Error>(res: Response, error: ErrType, customHandlers?: Record<string, () => void>) => {
    const errorName = error.name;

    const handler = customHandlers?.[errorName];
    if (handler) {
        return handler();
    }

    logger.error(`Unexpected error: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
};

export const validateRequest = (schema: any, data: any, res: Response):  Joi.ValidationResult<any> => {
    const { error, value } = schema.validate(data);
    if (error) {

        logger.warn(`Validation error: ${JSON.stringify(error.details, null, 2)}`);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return { error, value };
    }
    return { error, value };
};