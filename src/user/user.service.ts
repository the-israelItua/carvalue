import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(body: CreateUserDto) {
    const user = this.userRepository.create(body);
    return this.userRepository.save(user);
  }

  fetchAll(email: string) {
    return this.userRepository.find({
      where: {
        email,
      },
    });
  }

  fetchOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(user: User, attrs: Partial<User>){
      Object.assign(user, attrs)
      return this.userRepository.save(user)
  }

  remove(user: User){
    return this.userRepository.remove(user)
}
}
