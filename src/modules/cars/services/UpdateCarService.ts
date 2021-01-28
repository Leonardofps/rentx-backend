import { getRepository } from 'typeorm';
import Car from '../infra/typeorm/models/Car';

interface Request {
  car_id: string;
  name: string;
  brand: string;
  daily_value: number;
}

class UpdateCarService {
  public async execute({
    car_id,
    name,
    brand,
    daily_value,
  }: Request): Promise<Car> {
    const carsRepository = getRepository(Car);

    const car = await carsRepository.findOne({ where: { id: car_id } });

    if (!car) {
      throw new Error('Vehicle not found');
    }

    const checkCarNameAndBrand = await carsRepository.findOne({
      where: { name, brand },
    });

    if (checkCarNameAndBrand) {
      throw new Error(
        "It's not possible to create a car with the same name in the same brand",
      );
    }

    car.name = name;
    car.brand = brand;
    car.daily_value = daily_value;

    return carsRepository.save(car);
  }
}

export default UpdateCarService;
