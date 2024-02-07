import express from 'express';
import { importUsers, getUsers } from '../controllers/userController';
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

// Define your routes here
router.get('/', getUsers)
router.post('/import', upload.single('file'),  importUsers);

export default router;