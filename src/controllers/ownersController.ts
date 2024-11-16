import { Request, Response } from 'express';
import { createOwnerSchema, updateOwnerSchema } from '../validation/ownerValidation';
import logger from '../logger';
import OwnerService from '../services/ownerService';
import OwnerNotFoundError from '../errors/ownerNotFoundError';

export const getOwners = async (req: Request, res: Response) => {
    try {
        const owners = await OwnerService.getOwners();

        res.status(200).json(owners);
        return;
    } catch (error) {
        logger.error(`Error getting owners: ${error}`);

        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const getOwnerById = async (req: Request, res: Response) => {
    try {
        const owner = await OwnerService.getOwnerByID(req.params.id);

        if (!owner) {
            res.status(404).json({ message: 'Owner not found' });
            return;
        }

        res.status(200).json(owner);
        return;
    } catch (error) {
        logger.error(`Error getting owner: ${error}`);

        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const createOwner = async (req: Request, res: Response) => {
    const { error, value } = createOwnerSchema.validate(req.body);

    if (error) {
        logger.warn('Invalid owner create data:', error.details);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return;
    }

    try {
        const owner = await OwnerService.findOwnerByEmail(value.email);

        if (owner) {
            res.status(409).json({ message: 'Owner already exists' });
            return;
        }

        const createdOwner = await OwnerService.createOwner(value);
        res.status(201).json(createdOwner);
        return;
    } catch (error) {
        logger.error(`Error creating owner: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }

};

export const updateOwner = async (req: Request, res: Response) => {
    const { error, value } = updateOwnerSchema.validate(req.body);
    if (error) {
        logger.warn('Invalid owner update data:', error.details);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return;
    }

    try {
        const owner = await OwnerService.updateOwner(req.params.id, value);

        res.status(200).json(owner);
        return;
    } catch (error) {
        if (error instanceof OwnerNotFoundError) {
            res.status(404).json({ message: 'Owner not found' });
            return;
        }
        
        logger.error(`Error getting owner: ${error}`);

        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const deleteOwner = async (req: Request, res: Response) => {
    try {
        await OwnerService.deleteOwner(req.params.id);

        res.status(204).json();
        return;
    } catch (error) {
        if (error instanceof OwnerNotFoundError) {
            res.status(404).json({ message: 'Owner not found' });
            return;
        }

        logger.error(`Error deleting owner: ${error}`);

        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};