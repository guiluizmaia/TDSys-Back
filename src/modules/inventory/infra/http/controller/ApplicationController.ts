import CreateProductService from "src/modules/products/services/CreateProductService";
import { container } from "tsyringe";
import { Request, Response } from 'express';
import CreateApplicationService from "src/modules/inventory/services/CreateApplicationService";
import UpdateApplicationService from "src/modules/inventory/services/UpdateApplicationService";
import DeleteApplicationService from "src/modules/inventory/services/DeleteApplicationService";
import IndexApplicationService from "src/modules/inventory/services/IndexApplicationService";
import FindApplicationService from "src/modules/inventory/services/FindApplicationService";

class ApplicationController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const application = await container
          .resolve(CreateApplicationService)
          .execute(data);
    
        return response.status(201).json(application);
    }

    public async update(request: Request, response: Response): Promise<Response> {
      const data = request.body;
  
      const application = await container
        .resolve(UpdateApplicationService)
        .execute(data);
  
      return response.status(201).json(application);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;
  
      const product = await container
        .resolve(DeleteApplicationService)
        .execute(id);
  
      return response.status(200).json(product);
    }

    public async index(request: Request, response: Response): Promise<Response> {
      let { page } = request.query;
    
      if(isNaN(Number(page))) page = '0'
  
      const application = await container
        .resolve(IndexApplicationService)
        .execute({ page: Number(page) });
  
      return response.status(200).json(application);
    }

    public async findById(request: Request, response: Response): Promise<Response> {
      let { id } = request.params;
    
      const application = await container
        .resolve(FindApplicationService)
        .execute({ id, type: 'ID' });
  
      return response.status(200).json(application);
    }

    public async findByProductId(request: Request, response: Response): Promise<Response> {
      let { id } = request.params;
    
      const application = await container
        .resolve(FindApplicationService)
        .execute({ id, type: 'PRODUCTID' });
  
      return response.status(200).json(application);
    }

    public async findByTalhaoId(request: Request, response: Response): Promise<Response> {
      let { id } = request.params;
    
      const application = await container
        .resolve(FindApplicationService)
        .execute({ id, type: 'TALHAOID' });
  
      return response.status(200).json(application);
    }
}

export default ApplicationController