import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../infra/typeorm/models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    isAdmin,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('E-mail address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
