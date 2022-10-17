import { container } from "tsyringe";
import { Request, Response } from 'express';
import CreateClientsService from "src/modules/clients/services/CreateClientsService";
import UpdateClientsService from "src/modules/clients/services/UpdateClientsService";
import IndexClientsByIdService from "src/modules/clients/services/IndexClientsByIdService";
import DeleteClientsService from "src/modules/clients/services/DeleteClientsService";
import GetClientsByIdService from "src/modules/clients/services/GetClientsByIdService";
import SearchClientsByNameService from "src/modules/clients/services/SearchClientsByNameService";

class ClientsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const product = await container
          .resolve(CreateClientsService)
          .execute(data);
    
        return response.status(201).json(product);
      }
    
      public async update(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const product = await container
          .resolve(UpdateClientsService)
          .execute(data);
    
        return response.status(201).json(product);
      }
      
      public async index(request: Request, response: Response): Promise<Response> {
        let { page } = request.query;
    
        if(isNaN(Number(page))) page = '0'
    
        const product = await container
          .resolve(IndexClientsByIdService)
          .execute({ page: Number(page) });
    
        return response.status(200).json(product);
      }   

      public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const product = await container
          .resolve(DeleteClientsService)
          .execute({ id });
    
        return response.status(200).json(product);
      }
    
      public async find(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const product = await container
          .resolve(GetClientsByIdService)
          .execute({ id });
    
        return response.status(200).json(product);
      }

      public async search(request: Request, response: Response): Promise<Response> {
        const { name } = request.params;
    
        const products = await container
          .resolve(SearchClientsByNameService)
          .execute({ name });
    
        return response.status(200).json(products);
      }
}

export default ClientsController