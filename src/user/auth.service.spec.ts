import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

it('can create an instance of auth service', async () => {
  const fakeUsersService: Partial<UserService> = {
    fetchAll: () => Promise.resolve([]),
    create: (body: CreateUserDto) => Promise.resolve({ id: 1, ...body }),
  };
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: UserService, useValue: fakeUsersService },
    ],
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
