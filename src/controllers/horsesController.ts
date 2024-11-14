import { Request, Response } from 'express';
import { createHorseSchema, filterHorsesSchema, updateHealthStatusSchema } from '../validation/horseValidation';
import logger from '../logger';

export const createHorse = async (req: Request, res: Response) => {
    const { error, value } = createHorseSchema.validate(req.body);
    if (error) {
        logger.warn('Invalid horse creation data:', error.details);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return;
    }

    res.status(201).json({ create: true });
    return;
};

export const getHorses = async (req: Request, res: Response) => {
    const { error, value } = filterHorsesSchema.validate(req.query);

    if (error) {
        logger.warn('Invalid horse filter data:', error.details);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return;
    }

    res.status(201).json({ get: true });
    return;
};

export const updateHorse = async (req: Request, res: Response) => {
    res.status(201).json({ update: true });
};

export const deleteHorse = async (req: Request, res: Response) => {
    res.status(201).json({ delete: true });
};

export const updateHealthStatus = async (req: Request, res: Response) => {
    const { error, value } = updateHealthStatusSchema.validate(req.body);
    if (error) {
        logger.warn('Invalid health status update data:', error.details);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return;
    }

    res.status(201).json({ updateHealth: true });
    return;
};
