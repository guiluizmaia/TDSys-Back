import { Router, Request, Response } from 'express';

import PropertiesController from '../controller/PropertiesController';

const propertiesRoutes = Router();

const propertiesController = new PropertiesController();

propertiesRoutes.post('/', propertiesController.create);
propertiesRoutes.patch('/', propertiesController.update);
propertiesRoutes.get('/search/:name', propertiesController.search);
propertiesRoutes.get('/:id', propertiesController.find);
propertiesRoutes.delete('/:id', propertiesController.delete);
propertiesRoutes.get('/', propertiesController.index);

export default propertiesRoutes;
