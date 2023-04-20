import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import UserEntity from "./user.entity";
import { CreateUserDto } from "middleware/CreateUserDto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get all users
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  //get single user
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<UserEntity> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException("User does not exist!");
    } else {
      return user;
    }
  }

  //create user
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  // login user
  @Post("login")
  async login(@Body() user: UserEntity): Promise<UserEntity> {
    return this.usersService.login(user.email, user.password);
  }

  //update user
  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() user: UserEntity
  ): Promise<any> {
    return this.usersService.update(id, user);
  }

  //delete user
  @Delete(":id")
  async delete(@Param("id") id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException("User does not exist!");
    }
    return this.usersService.delete(id);
  }
}
