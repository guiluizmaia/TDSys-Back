import CreateProviderService from "src/modules/providers/services/CreateProviderService";
import { container } from "tsyringe";
import { Request, Response } from 'express';
import UpdateProviderService from "src/modules/providers/services/UpdateProviderService";
import IndexProviderService from "src/modules/providers/services/IndexProviderService";
import GetProviderByIdService from "src/modules/providers/services/GetProviderByIdService";

class ProviderController{
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const provider = await container
          .resolve(CreateProviderService)
          .execute(data);
    
        return response.status(201).json(provider);
      }
    
      public async update(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const provider = await container
          .resolve(UpdateProviderService)
          .execute(data);
    
        return response.status(201).json(provider);
      }

      
      public async index(request: Request, response: Response): Promise<Response> {
        let { page } = request.query;
    
        if(isNaN(Number(page))) page = '0'
    
        const providers = await container
          .resolve(IndexProviderService)
          .execute({ page: Number(page) });
    
        return response.status(200).json(providers);
      }
    
      public async find(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const provider = await container
          .resolve(GetProviderByIdService)
          .execute({ id });
    
        return response.status(200).json(provider);
      }

}

export default ProviderController;