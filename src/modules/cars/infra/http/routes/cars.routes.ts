import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

import CreateCarService from '../../../services/CreateCarService';
import ListCarService from '../../../services/ListCarService';
import UpdateCarService from '../../../services/UpdateCarService';
import DeleteCarService from '../../../services/DeleteCarService';

const carsRouter = Router();

carsRouter.use(ensureAuthenticated);

carsRouter.get('/', async (request, response) => {
  const listCar = new ListCarService();

  const cars = await listCar.execute();

  return response.json(cars);
});

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

carsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { name, brand, daily_value } = request.body;
    const updateCar = new UpdateCarService();

    const car = await updateCar.execute({
      car_id: id,
      name,
      brand,
      daily_value,
    });

    return response.json(car);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

carsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deleteCar = new DeleteCarService();

    await deleteCar.execute({
      car_id: id,
    });

    return response.json({ msg: 'Vehicle destroyied' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default carsRouter;
