import { Router, Request, Response } from 'express';

import TalhaoController from '../controller/TalhaoController';

const talhaoRoutes = Router();

const talhaoController = new TalhaoController();

talhaoRoutes.post('/', talhaoController.create);
talhaoRoutes.patch('/', talhaoController.update);
talhaoRoutes.get('/search/:name', talhaoController.search);
talhaoRoutes.get('/:id', talhaoController.find);
talhaoRoutes.delete('/:id', talhaoController.delete);
talhaoRoutes.get('/', talhaoController.index);

export default talhaoRoutes;
