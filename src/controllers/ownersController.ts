import { Request, Response } from 'express';
import { createOwnerSchema, updateOwnerSchema } from '../validation/ownerValidation';
import OwnerService from '../services/ownerService';
import { handleControllerError, validateRequest } from '../utils/controllerHelper';

export const getOwners = async (req: Request, res: Response) => {
    try {
        const owners = await OwnerService.getOwners();

        res.status(200).json(owners);
        return;
    } catch (error) {
        handleControllerError(res, error as Error);
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
        handleControllerError(res, error as Error);
    }
};

export const createOwner = async (req: Request, res: Response) => {
    const { error, value } = validateRequest(createOwnerSchema, req.body, res)
    if (error) return;

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
        handleControllerError(res, error as Error);
    }

};

export const updateOwner = async (req: Request, res: Response) => {
    const { error, value } = validateRequest(updateOwnerSchema, req.body, res)
    if (error) return;

    try {
        const owner = await OwnerService.updateOwner(req.params.id, value);

        res.status(200).json(owner);
        return;
    } catch (error) {
        handleControllerError(res, error as Error, {
            OwnerNotFoundError: () => res.status(404).json({ message: 'Owner not found' }),
        });
    }
};

export const deleteOwner = async (req: Request, res: Response) => {
    try {
        await OwnerService.deleteOwner(req.params.id);

        res.status(204).json();
        return;
    } catch (error) {
        handleControllerError(res, error as Error, {
            OwnerNotFoundError: () => res.status(404).json({ message: 'Owner not found' }),
        });
    }
};