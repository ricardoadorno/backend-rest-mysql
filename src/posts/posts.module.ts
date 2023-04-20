import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import PostEntity from "./post.entity";
import { UsersService } from "src/users/users.service";
import { UsersController } from "src/users/users.controller";
import UserEntity from "src/users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  controllers: [PostsController, UsersController],
  providers: [PostsService, UsersService],
})
export class PostsModule {}
