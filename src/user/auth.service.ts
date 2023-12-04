import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup({ email, password }: CreateUserDto) {
    const user = await this.userService.fetchAll(email);

    if (user.length) {
      throw new BadRequestException('User with this email already exists');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const hashedPassword = salt + '.' + hash.toString('hex');

    const newUser = await this.userService.create({
      email,
      password: hashedPassword,
    });

    return newUser;
  }

  async signin({ email, password }: CreateUserDto) {
    const [user] = await this.userService.fetchAll(email);

    if (!user) {
      throw new NotFoundException('Incorrect email or password.');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash === hash.toString('hex')) {
      return user;
    }

    throw new BadRequestException('Incorrect email or password.');
  }
}
