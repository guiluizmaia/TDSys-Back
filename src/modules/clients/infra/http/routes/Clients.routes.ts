import { Router, Request, Response } from 'express';

import ClientsController from '../controller/ClientsController';

const clientsRoutes = Router();

const clientsController = new ClientsController();

clientsRoutes.post('/', clientsController.create);
clientsRoutes.patch('/', clientsController.update);
clientsRoutes.get('/search/:name', clientsController.search);
clientsRoutes.get('/:id', clientsController.find);
clientsRoutes.delete('/:id', clientsController.delete);
clientsRoutes.get('/', clientsController.index);

export default clientsRoutes;
