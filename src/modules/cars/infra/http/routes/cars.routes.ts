import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

import CreateCarService from '../../../services/CreateCarService';

const carsRouter = Router();

carsRouter.use(ensureAuthenticated);

carsRouter.post('/', async (request, response) => {
  try {
    const { name, brand, daily_value } = request.body;

    const createCar = new CreateCarService();

    const car = await createCar.execute({ name, brand, daily_value });

    return response.json(car);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default carsRouter;
