import express from 'express'
import { createSprint, getAllSprint, getSprintById, getSprintByuserId ,getAiTasks, getTaskBySprintId,updateTask } from '../controllers/sprintController';
import protect from '../middleware/proctect';

const sprintRouter=express.Router()

sprintRouter.get('/sprint/',protect,getAllSprint);
sprintRouter.post('/sprint/create',protect, createSprint);
sprintRouter.get('/sprint/user', protect, getSprintByuserId);
sprintRouter.post('/sprint/aiSuggestion',protect, getAiTasks );
sprintRouter.get('/sprint/tasks/:sprintId',protect,getTaskBySprintId);
sprintRouter.get('/sprint/:_id',protect, getSprintById);
sprintRouter.post('/sprint/updateTask/:sprintId', protect, updateTask)


export default sprintRouter