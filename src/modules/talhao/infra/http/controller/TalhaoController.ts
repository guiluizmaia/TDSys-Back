import { container } from "tsyringe";
import { Request, Response } from 'express';
import CreateTalhaoService from "src/modules/talhao/services/CreateTalhaoService";
import UpdateTalhaoService from "src/modules/talhao/services/UpdateTalhaoService";
import IndexTalhaoService from "src/modules/talhao/services/IndexTalhaoService";
import DeleteTalhaoService from "src/modules/talhao/services/DeleteTalhaoService";
import GetTalhaoByIdService from "src/modules/talhao/services/GetTalhaoByIdService";
import SearchTalhaoByNameService from "src/modules/talhao/services/SearchTalhaoByNameService";
import TalhaoReportService from "src/modules/talhao/services/TalhaoReportService";

class TalhaoController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const property = await container
          .resolve(CreateTalhaoService)
          .execute(data);
    
        return response.status(201).json(property);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const property = await container
          .resolve(UpdateTalhaoService)
          .execute(data);
    
        return response.status(201).json(property);
    }

    public async index(request: Request, response: Response): Promise<Response> {
        let { page } = request.query;
    
        if(isNaN(Number(page))) page = '0'
    
        const property = await container
          .resolve(IndexTalhaoService)
          .execute({ page: Number(page) });
    
        return response.status(200).json(property);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const property = await container
          .resolve(DeleteTalhaoService)
          .execute({ id });
    
        return response.status(200).json(property);
    }

    public async find(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const property = await container
          .resolve(GetTalhaoByIdService)
          .execute({ id });
    
        return response.status(200).json(property);
    }
    
    public async search(request: Request, response: Response): Promise<Response> {
        const { name } = request.params;
    
        const property = await container
          .resolve(SearchTalhaoByNameService)
          .execute({ name });
    
        return response.status(200).json(property);
    }
    
    public async report(request: Request, response: Response): Promise<Response> {
      const { talhaoIds } = request.query;
       
      const products = await container
        .resolve(TalhaoReportService)
        .execute({ talhaoIds: JSON.parse(talhaoIds) });
  
      return response.status(200).json(products);
    }
}

export default TalhaoController
