import { Router, Request, Response } from 'express';

import PurchaseController from '../controller/PurchaseController';

const purchaseRoutes = Router();

const purchaseController = new PurchaseController();

purchaseRoutes.post('/', purchaseController.create);
purchaseRoutes.patch('/', purchaseController.update);
purchaseRoutes.get('/', purchaseController.index);
purchaseRoutes.get('/:id', purchaseController.byId);
purchaseRoutes.delete('/:id', purchaseController.delete);

export default purchaseRoutes;
