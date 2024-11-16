import e, { Request, Response } from 'express';
import { createHorseSchema, filterHorsesSchema, updateHealthStatusSchema, updateHorseSchema } from '../validation/horseValidation';
import logger from '../logger';
import HorseService from '../services/horseService';
import OwnerNotFoundError from '../errors/ownerNotFoundError';
import HorseNotFoundError from '../errors/horseNotFoundError';

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
        if (error instanceof OwnerNotFoundError) {
            logger.warn(`Error creating horse: ${error}`);
            res.status(404).json({ message: 'Owner not found' });
            return;
        }

        logger.error(`Error creating horse: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        return;
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
        logger.error(`Error getting horses: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        return;
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
        if (error instanceof HorseNotFoundError) {
            res.status(404).json({ message: 'Horse not found' });
            return;
        } else if (error instanceof OwnerNotFoundError) {
            res.status(404).json({ message: 'Owner not found' });
            return;
        }

        logger.error(`Error updating horse: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const deleteHorse = async (req: Request, res: Response) => {
    try {
        await HorseService.deleteHorse(req.params.id);

        res.status(204).json();
        return;
    } catch (error) {
        if (error instanceof HorseNotFoundError) {
            res.status(404).json({ message: 'Horse not found' });
            return;
        }

        logger.error(`Error deleting horse: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        return;
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
        if (error instanceof HorseNotFoundError) {
            res.status(404).json({ message: 'Horse not found' });
            return;
        }

        logger.error(`Error updating horse: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};
