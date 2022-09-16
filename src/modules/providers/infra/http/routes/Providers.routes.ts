import { Router, Request, Response } from 'express';

import ProviderController from '../controller/ProviderController';

const providersRoutes = Router();

const providerController = new ProviderController();

providersRoutes.post('/', providerController.create);
providersRoutes.patch('/', providerController.update);
providersRoutes.get('/:id', providerController.find);
providersRoutes.get('/', providerController.index);

export default providersRoutes;
