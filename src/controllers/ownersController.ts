import { Request, Response } from 'express';

export const getOwners = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json({get:true});
};

export const getOwnerById = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json({getByID:true});
};

export const createOwner = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json({create:true});
};

export const updateOwner = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json({update:true});
};

export const deleteOwner = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json({delete:true});
};