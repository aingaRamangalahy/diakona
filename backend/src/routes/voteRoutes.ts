import express from 'express';
import { vote } from '../controllers/voteController';

const router = express.Router();

// Define your routes here
router.post('/', vote);

export default router;