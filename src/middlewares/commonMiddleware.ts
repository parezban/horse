import express, { Application, Response } from 'express';
import logger from '../logger';

export const applyMiddlewares = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export const handleControllerError = <ErrType extends Error>(res: Response, error: ErrType, customHandlers?: Record<string, () => void>) => {
  const errorName = error.name;

  const handler = customHandlers?.[errorName];
  if (handler) {
    return handler();
  }


  logger.error(`Unexpected error: ${error}`);
  res.status(500).json({ message: 'Internal server error' });
};