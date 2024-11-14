import express from 'express';
import { createOwner, getOwnerById, getOwners, updateOwner, deleteOwner } from '../controllers/ownersController';
import { checkRole } from '../middlewares/rbacMiddleware';

const router = express.Router();

router.route('/')
  .post(checkRole(['admin']), createOwner)
  .get(checkRole(['admin', 'vet']), getOwners);

router.route('/:id')
  .get(checkRole(['admin', 'vet']), getOwnerById)
  .put(checkRole(['admin']), updateOwner)
  .delete(checkRole(['admin']), deleteOwner);

export default router;
