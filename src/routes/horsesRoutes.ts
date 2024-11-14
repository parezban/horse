import express from 'express';
import { createHorse, getHorses, updateHorse, deleteHorse, updateHealthStatus } from '../controllers/horsesController';

const router = express.Router();

router.route('/')
    .post(createHorse)
    .get(getHorses);

router.route('/:id')
    .put(updateHorse)
    .delete(deleteHorse);

router.put('/:id/health', updateHealthStatus);

export default router;