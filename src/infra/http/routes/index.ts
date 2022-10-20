import { Request, Response, Router } from 'express';
import clientsRoutes from 'src/modules/clients/infra/http/routes/Clients.routes';
import productRoutes from 'src/modules/products/infra/http/routes/Product.routes';
import propertiesRoutes from 'src/modules/properties/infra/http/routes/Properties.routes';
import providersRoutes from 'src/modules/providers/infra/http/routes/Providers.routes';
import talhaoRoutes from 'src/modules/talhao/infra/http/routes/Talhao.routes';
import authenticateRoutes from 'src/modules/users/infra/http/routes/Authenticate.routes';
import userRoutes from 'src/modules/users/infra/http/routes/User.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const v1Routes = Router();

v1Routes.use('/login', authenticateRoutes);
v1Routes.use('/user', ensureAuthenticated, userRoutes);
v1Routes.use('/provider', ensureAuthenticated, providersRoutes);
v1Routes.use('/product', ensureAuthenticated, productRoutes);
v1Routes.use('/clients', ensureAuthenticated, clientsRoutes);
v1Routes.use('/properties', ensureAuthenticated, propertiesRoutes);
v1Routes.use('/talhao', ensureAuthenticated, talhaoRoutes);

export default v1Routes;
