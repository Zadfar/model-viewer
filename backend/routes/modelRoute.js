import express from 'express';
import {uploadModel, getAllModels, getModelById, deleteModel} from "../controllers/modelController.js";
import uploadMiddleware from '../middleware/uploadMiddleware.js';


const router = express.Router();

router.post('/upload', uploadMiddleware, uploadModel);
router.get('/', getAllModels);
router.get('/:id', getModelById);
router.delete('/:id', deleteModel);

export default router;