import { getRepository } from 'typeorm';
import Car from '../infra/typeorm/models/Car';

class ListCarService {
  public async execute() {
    const carsRepoitory = getRepository(Car);

    const cars = await carsRepoitory.find();

    return cars;
  }
}

export default ListCarService;
