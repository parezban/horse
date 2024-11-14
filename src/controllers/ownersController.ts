import { Request, Response } from 'express';
import { createOwnerSchema, updateOwnerSchema } from '../validation/ownerValidation';
import logger from '../logger';

export const getOwners = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json({get:true});
};

export const getOwnerById = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json({getByID:true});
};

export const createOwner = async (req: Request, res: Response): Promise<void> => {
    const { error, value } = createOwnerSchema.validate(req.body);
    if (error) {
        logger.warn('Invalid owner create data:', error.details);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return;
    }

    res.status(201).json({create:true});
};

export const updateOwner = async (req: Request, res: Response): Promise<void> => {
    const { error, value } = updateOwnerSchema.validate(req.body);
    if (error) {
        logger.warn('Invalid owner update data:', error.details);
        res.status(400).json({ message: 'Invalid data', details: error.details });
        return;
    }

    res.status(201).json({update:true});
};

export const deleteOwner = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json({delete:true});
};