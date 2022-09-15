import AuthenticateService from '../../../services/AuthenticateService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from 'src/modules/users/services/CreateUserService';
import UpdateUserService from 'src/modules/users/services/UpdateUserService';

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
}

export default UserController;
