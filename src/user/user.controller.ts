import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.userService = userService;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id
    return user
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto,  @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id
    return user
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null
  }

  @Get('/users')
  @UseGuards(AuthGuard)
  fetchUsers(@Query('email') email: string) {
    return this.userService.fetchAll(email);
  }

  @Get('/users/:id')
  @UseGuards(AuthGuard)
  async fetchUser(@Param('id') id: number) {
    const user = await this.userService.fetchOne(id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  @Patch('/users/:id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: number, @Body() body: Partial<User>) {
    const user = await this.fetchUser(id);
    return this.userService.update(user, body);
  }

  @Delete('users/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: number) {
    const user = await this.fetchUser(id);
    return this.userService.remove(user);
  }
}
