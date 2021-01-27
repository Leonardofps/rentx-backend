import { getRepository } from 'typeorm';
import Car from '../infra/typeorm/models/Car';

interface Request {
  name: string;
  brand: string;
  daily_value: number;
}

class CreateCarService {
  public async execute({ name, brand, daily_value }: Request): Promise<Car> {
    const carsRepository = getRepository(Car);

    const checkCarNameAndBrand = await carsRepository.findOne({
      where: { name, brand },
    });

    if (checkCarNameAndBrand) {
      throw new Error(
        "It's not possible to create a car with the same name in the same brand",
      );
    }

    const car = carsRepository.create({
      name,
      brand,
      daily_value,
    });

    await carsRepository.save(car);

    return car;
  }
}

export default CreateCarService;
