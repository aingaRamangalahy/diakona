import express from 'express';
import { importUsers } from '../controllers/userController';
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

// Define your routes here
router.post('/import', upload.single('file'),  importUsers);

export default router;