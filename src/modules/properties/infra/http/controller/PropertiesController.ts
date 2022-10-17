import { container } from "tsyringe";
import { Request, Response } from 'express';
import CreatePropertyService from "src/modules/properties/services/CreatePropertyService";
import UpdatePropertyService from "src/modules/properties/services/UpdatePropertyService";
import IndexPropertiesService from "src/modules/properties/services/IndexPropertiesService";
import DeletePropertyService from "src/modules/properties/services/DeletePropertyService";
import GetPropertyByIdService from "src/modules/properties/services/GetPropertyByIdService";
import SearchPropertyByNameService from "src/modules/properties/services/SearchPropertyByNameService";

class PropertiesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const property = await container
          .resolve(CreatePropertyService)
          .execute(data);
    
        return response.status(201).json(property);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const property = await container
          .resolve(UpdatePropertyService)
          .execute(data);
    
        return response.status(201).json(property);
    }

    public async index(request: Request, response: Response): Promise<Response> {
        let { page } = request.query;
    
        if(isNaN(Number(page))) page = '0'
    
        const property = await container
          .resolve(IndexPropertiesService)
          .execute({ page: Number(page) });
    
        return response.status(200).json(property);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const property = await container
          .resolve(DeletePropertyService)
          .execute({ id });
    
        return response.status(200).json(property);
    }

    public async find(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const property = await container
          .resolve(GetPropertyByIdService)
          .execute({ id });
    
        return response.status(200).json(property);
    }
    
    public async search(request: Request, response: Response): Promise<Response> {
        const { name } = request.params;
    
        const property = await container
          .resolve(SearchPropertyByNameService)
          .execute({ name });
    
        return response.status(200).json(property);
    }
}
export default PropertiesController
