import express, { Application } from 'express';

export const applyMiddlewares = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};