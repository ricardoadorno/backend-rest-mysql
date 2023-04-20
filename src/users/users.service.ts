import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import UserEntity from "./user.entity";

import { comparePassword, hashPassword } from "utils/hashPassword";
import { CreateUserDto } from "middleware/CreateUserDto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async login(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("User does not exist!");
    }

    if (comparePassword(password, user.password)) {
      return user;
    }

    throw new Error("Invalid password!");
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const newuser = this.userRepository.create(
      Object.assign({}, user, { password: hashPassword(user.password) })
    );

    return this.userRepository.save(newuser);
  }

  async update(id: number, user: Partial<UserEntity>): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
