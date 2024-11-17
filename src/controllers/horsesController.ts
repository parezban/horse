import { Request, Response } from 'express';
import { createHorseSchema, filterHorsesSchema, updateHealthStatusSchema, updateHorseSchema } from '../validation/horseValidation';
import HorseService from '../services/horseService';
import { handleControllerError, validateRequest } from '../utils/controllerHelper';

export const createHorse = async (req: Request, res: Response) => {
    const {error, value} = validateRequest(createHorseSchema, req.body, res)
    if (error) return;

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
    const {error, value} = validateRequest(filterHorsesSchema, req.query, res)
    if (error) return;

    try {
        const horses = await HorseService.getHorses(value);
        res.status(200).json(horses);
        return;
    } catch (error) {
        handleControllerError(res, error as Error);
    }
};
export const updateHorse = async (req: Request, res: Response) => {
    const {error, value} = validateRequest(updateHorseSchema, req.body, res)
    if (error) return;

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
    const {error, value} = validateRequest(updateHealthStatusSchema, req.body, res)
    if (error) return;

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
