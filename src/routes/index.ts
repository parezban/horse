import express from 'express';
import horsesRoutes from './horsesRoutes';
import ownersRoutes from './ownersRoutes';

const router = express.Router();

router.use('/horses', horsesRoutes);
router.use('/owners', ownersRoutes);

export default router;