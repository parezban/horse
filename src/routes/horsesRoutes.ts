import express from 'express';
import { createHorse, getHorses, updateHorse, deleteHorse, updateHealthStatus } from '../controllers/horsesController';
import { checkRole } from '../middlewares/rbacMiddleware';

const router = express.Router();

router.route('/')
    .post(checkRole(['admin']), createHorse)
    .get(checkRole(['admin', 'vet']), getHorses);

router.route('/:id')
    .put(checkRole(['admin']), updateHorse)
    .delete(checkRole(['admin']), deleteHorse);

router.put('/:id/health',checkRole(['admin', 'vet']), updateHealthStatus);

export default router;