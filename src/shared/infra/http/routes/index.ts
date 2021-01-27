import { Router } from 'express';

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import carsRouter from '../../../../modules/cars/infra/http/routes/cars.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/cars', carsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
