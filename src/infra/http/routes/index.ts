import { Request, Response, Router } from 'express';
import authenticateRoutes from 'src/modules/users/infra/http/routes/Authenticate.routes';
import userRoutes from 'src/modules/users/infra/http/routes/User.routes';

const v1Routes = Router();

v1Routes.use('/login', authenticateRoutes);
v1Routes.use('/user', userRoutes);

export default v1Routes;
