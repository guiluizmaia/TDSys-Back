import AuthenticateService from '../../../services/AuthenticateService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from 'src/modules/users/services/CreateUserService';
import UpdateUserService from 'src/modules/users/services/UpdateUserService';
import IndexUserService from 'src/modules/users/services/IndexUserService';
import GetUserByIdService from 'src/modules/users/services/GetUserByIdService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const user = await container
      .resolve(CreateUserService)
      .execute(data);

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const user = await container
      .resolve(UpdateUserService)
      .execute(data);

    return response.status(201).json(user);
  }
  
  public async index(request: Request, response: Response): Promise<Response> {
    let { page } = request.query;

    if(isNaN(Number(page))) page = '0'

    const users = await container
      .resolve(IndexUserService)
      .execute({ page: Number(page) });

    return response.status(200).json(users);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const user = await container
      .resolve(GetUserByIdService)
      .execute({ id });

    return response.status(200).json(user);
  }
}

export default UserController;
