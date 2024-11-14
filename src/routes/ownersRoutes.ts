import express from 'express';
import { createOwner, getOwnerById, getOwners, updateOwner, deleteOwner } from '../controllers/ownersController';

const router = express.Router();

router.route('/')
  .post(createOwner)
  .get(getOwners);

router.route('/:id')
  .get(getOwnerById)
  .put(updateOwner)
  .delete(deleteOwner);

export default router;
