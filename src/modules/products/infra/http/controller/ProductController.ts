import CreateProductService from "src/modules/products/services/CreateProductService";
import { container } from "tsyringe";
import { json, Request, Response } from 'express';
import UpdateProductService from "src/modules/products/services/UpdateProductService";
import IndexProductByIdService from "src/modules/products/services/IndexProductByIdService";
import GetProductByIdService from "src/modules/products/services/GetProductByIdService";
import SearchProductByNameService from "src/modules/products/services/SearchProductByNameService";
import DeleteProductService from "src/modules/products/services/DeleteProductService";
import GetProductByPropertyIdService from "src/modules/products/services/GetProductByPropertyIdService";
import SearchProductByNameAndPropertyService from "src/modules/products/services/SearchProductByNameAndPropertyService";
import ProductReportService from "src/modules/products/services/ProductReportService";

class ProductController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const product = await container
          .resolve(CreateProductService)
          .execute(data);
    
        return response.status(201).json(product);
      }
    
      public async update(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const product = await container
          .resolve(UpdateProductService)
          .execute(data);
    
        return response.status(201).json(product);
      }
      
      public async index(request: Request, response: Response): Promise<Response> {
        let { page } = request.query;
    
        if(isNaN(Number(page))) page = '0'
    
        const product = await container
          .resolve(IndexProductByIdService)
          .execute({ page: Number(page) });
    
        return response.status(200).json(product);
      }   

      public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const product = await container
          .resolve(DeleteProductService)
          .execute({ id });
    
        return response.status(200).json(product);
      }
    
      public async find(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const product = await container
          .resolve(GetProductByIdService)
          .execute({ id });
    
        return response.status(200).json(product);
      }

      public async findByProperty(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const product = await container
          .resolve(GetProductByPropertyIdService)
          .execute({ id });
    
        return response.status(200).json(product);
      }

      public async search(request: Request, response: Response): Promise<Response> {
        const { name } = request.params;
    
        const products = await container
          .resolve(SearchProductByNameService)
          .execute({ name });
    
        return response.status(200).json(products);
      }

      public async searchAndProperty(request: Request, response: Response): Promise<Response> {
        const { name, id } = request.params;
    
        const products = await container
          .resolve(SearchProductByNameAndPropertyService)
          .execute({ name, id });
    
        return response.status(200).json(products);
      }

      public async report(request: Request, response: Response): Promise<Response> {
        const { propertyIds } = request.query;
    
        
        const products = await container
          .resolve(ProductReportService)
          .execute({ propertyIds: JSON.parse(propertyIds) });
    
        return response.status(200).json(products);
      }
}

export default ProductController