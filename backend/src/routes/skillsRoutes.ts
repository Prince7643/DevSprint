import express from 'express';
import { getAllSkills } from '../controllers/skillsController';
const router = express.Router();

router.get('/skills/', getAllSkills);


export default router;