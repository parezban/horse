import express from 'express';
import horsesRoutes from './horses';
import ownersRoutes from './owners';

const router = express.Router();

router.use('/horses', horsesRoutes);
router.use('/owners', ownersRoutes);

export default router;