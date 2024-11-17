import e, { Request, Response } from 'express';
import { createHorseSchema, filterHorsesSchema, updateHealthStatusSchema, updateHorseSchema } from '../validation/horseValidation';
import logger from '../logger';
import HorseService from '../services/horseService';
import { handleControllerError } from '../middlewares/commonMiddleware';

export const createHorse = async (req: Request, res: Response) => {
    const { error, value } = createHorseSchema.validate(req.body);
    if (error) {
        logger.warn('Invalid horse creation data:', error.details);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return;
    }

    try {
        const horse = await HorseService.createHorse(value);
        res.status(201).json(horse);
        return;
    } catch (error) {
        handleControllerError(res, error as Error, {
            OwnerNotFoundError: () => res.status(404).json({ message: 'Owner not found' }),
        });
    }
};

export const getHorses = async (req: Request, res: Response) => {
    const { error, value } = filterHorsesSchema.validate(req.query);

    if (error) {
        logger.warn('Invalid horse filter data:', error.details);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return;
    }

    try {
        const horses = await HorseService.getHorses(value);
        res.status(200).json(horses);
        return;
    } catch (error) {
        handleControllerError(res, error as Error);
    }
};

export const updateHorse = async (req: Request, res: Response) => {
    const { error, value } = updateHorseSchema.validate(req.body);
    if (error) {
        logger.warn('Invalid horse update data:', error.details);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return;
    }

    try {
        const horse = await HorseService.updateHorse(req.params.id, value);
        res.status(200).json(horse);
        return;
    } catch (error) {
        handleControllerError(res, error as Error, {
            OwnerNotFoundError: () => res.status(404).json({ message: 'Owner not found' }),
            HorseNotFoundError: () => res.status(404).json({ message: 'Horse not found' }),
        });
    }
};

export const deleteHorse = async (req: Request, res: Response) => {
    try {
        await HorseService.deleteHorse(req.params.id);

        res.status(204).json();
        return;
    } catch (error) {
        handleControllerError(res, error as Error, {
            HorseNotFoundError: () => res.status(404).json({ message: 'Horse not found' }),
        });
    }
};

export const updateHealthStatus = async (req: Request, res: Response) => {
    const { error, value } = updateHealthStatusSchema.validate(req.body);
    if (error) {
        logger.warn('Invalid health status update data:', error.details);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return;
    }

    try {
        const horse = await HorseService.updateHorse(req.params.id, value);
        res.status(200).json(horse);
        return;
    } catch (error) {
        handleControllerError(res, error as Error, {
            HorseNotFoundError: () => res.status(404).json({ message: 'Horse not found' }),
        });
    }
};
