import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
    constructor(private userService: UserService){
        this.userService = userService
    }

    @Post("/signup")
    createUser(@Body() body: CreateUserDto) {
        return this.userService.create(body)
    }

    @Get("/users")
    fetchUsers(@Query("email") email: string){
        return this.userService.fetchAll(email)
    }

    @Get("/users/:id")
    async fetchUser(@Param("id") id: number){
        const user = await this.userService.fetchOne(id)

        if(!user){
            throw new NotFoundException(`User not found`)
        }

        return user
    }

    @Patch("/users/:id")
    async updateUser(@Param("id") id: number, @Body() body: Partial<User>){
        const user = await this.fetchUser(id)
        return this.userService.update(user, body)
    }

    @Delete("users/:id")
    async deleteUser(@Param("id") id: number){
        const user = await this.fetchUser(id)
        return this.userService.remove(user)
    }
}
