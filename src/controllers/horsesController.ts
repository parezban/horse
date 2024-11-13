import { Request, Response } from 'express';

export const createHorse = async (req: Request, res: Response) => {
    res.status(201).json({create:true});
};

export const getHorses = async (req: Request, res: Response) => {
    res.status(201).json({get:true});
};

export const updateHorse = async (req: Request, res: Response) => {
    res.status(201).json({update:true});
};

export const deleteHorse = async (req: Request, res: Response) => {
    res.status(201).json({delete:true});
};

export const updateHealthStatus = async (req: Request, res: Response) => {
    res.status(201).json({updateHealth:true});
};
