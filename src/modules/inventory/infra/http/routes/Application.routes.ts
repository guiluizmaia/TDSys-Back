import { Router, Request, Response } from 'express';
import ApplicationController from '../controller/ApplicationController';


const applicationRoutes = Router();

const applicationController = new ApplicationController();

applicationRoutes.post('/', applicationController.create);
applicationRoutes.patch('/', applicationController.update);
applicationRoutes.get('/', applicationController.index);
applicationRoutes.get('/product/:id', applicationController.findByProductId);
applicationRoutes.get('/talhao/:id', applicationController.findByTalhaoId);
applicationRoutes.get('/:id', applicationController.findById);
applicationRoutes.delete('/:id', applicationController.delete);

export default applicationRoutes;
