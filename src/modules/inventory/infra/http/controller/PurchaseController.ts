import CreateProductService from "src/modules/products/services/CreateProductService";
import { container } from "tsyringe";
import { Request, Response } from 'express';
import CreatePurchaseService from "src/modules/inventory/services/CreatePurchaseService";
import SavePurchaseService from "src/modules/inventory/services/SavePurchaseService";
import DeletePurchaseService from "src/modules/inventory/services/DeletePurchaseService";
import IndexPurchaseService from "src/modules/inventory/services/IndexPurchaseService";
import FindByIdPurchaseService from "src/modules/inventory/services/FindByIdPurchaseService";
import PurchaseReportService from "src/modules/inventory/services/PurchaseReportService";

class PurchaseController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const product = await container
          .resolve(CreatePurchaseService)
          .execute(data);
    
        return response.status(201).json(product);
    }

    public async update(request: Request, response: Response): Promise<Response> {
      const data = request.body;
  
      const product = await container
        .resolve(SavePurchaseService)
        .execute(data);
  
      return response.status(201).json(product);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;
  
      const product = await container
        .resolve(DeletePurchaseService)
        .execute(id);
  
      return response.status(200).json(product);
    }

    public async index(request: Request, response: Response): Promise<Response> {
      let { page } = request.query;
    
      if(isNaN(Number(page))) page = '0'
  
      const product = await container
        .resolve(IndexPurchaseService)
        .execute({ page: Number(page) });
  
      return response.status(200).json(product);
    }

    public async byId(request: Request, response: Response): Promise<Response> {
      let { id } = request.params;
    
      const product = await container
        .resolve(FindByIdPurchaseService)
        .execute({ id });
  
      return response.status(200).json(product);
    }

    public async report(request: Request, response: Response): Promise<Response> {
      const { propertyIds } = request.query;
  
      
      const products = await container
        .resolve(PurchaseReportService)
        .execute({ propertyIds: JSON.parse(propertyIds) });
  
      return response.status(200).json(products);
    }
}

export default PurchaseController