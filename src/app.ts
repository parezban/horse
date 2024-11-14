import express from 'express';
import routes from './routes';
import { applyMiddlewares } from './middlewares/commonMiddleware';

const app = express();

applyMiddlewares(app);
app.use('/api/v1', routes);

export default app;