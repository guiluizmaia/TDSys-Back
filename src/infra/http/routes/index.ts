import { Request, Response, Router } from 'express';
import productRoutes from 'src/modules/products/infra/http/routes/Product.routes';
import providersRoutes from 'src/modules/providers/infra/http/routes/Providers.routes';
import authenticateRoutes from 'src/modules/users/infra/http/routes/Authenticate.routes';
import userRoutes from 'src/modules/users/infra/http/routes/User.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const v1Routes = Router();

v1Routes.use('/login', authenticateRoutes);
v1Routes.use('/user', ensureAuthenticated, userRoutes);
v1Routes.use('/provider', ensureAuthenticated, providersRoutes);
v1Routes.use('/product', ensureAuthenticated, productRoutes);


export default v1Routes;
