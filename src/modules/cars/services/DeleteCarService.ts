import { getRepository } from 'typeorm';
import Car from '../infra/typeorm/models/Car';

interface Request {
  car_id: string;
}

class DeleteCarService {
  public async execute({ car_id }: Request): Promise<void> {
    const carsRepository = getRepository(Car);

    const car = await carsRepository.findOne({ where: { id: car_id } });

    if (!car) {
      throw new Error('Vehicle not found');
    }

    await carsRepository.remove(car);
  }
}

export default DeleteCarService;
