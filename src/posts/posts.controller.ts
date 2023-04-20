import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import PostEntity from "./post.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("posts")
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Get all posts
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  // Get all posts for a user
  @Get(":userId")
  async findAllPostsForUser(
    @Param("userId") userId: number
  ): Promise<PostEntity[]> {
    return this.postsService.findAllPostsForUser(userId);
  }

  //  Create a new post
  @Post(":userId")
  async createPost(
    @Param("userId") userId: number,
    @Body() postBody: PostEntity
  ): Promise<PostEntity> {
    return this.postsService.createPost(userId, postBody);
  }

  // Update a post
  @Put(":userId/:postId")
  async updatePost(
    @Param("userId") userId: number,
    @Param("postId") postId: string,
    @Body() postBody: PostEntity
  ): Promise<PostEntity> {
    return this.postsService.updatePost(userId, postId, postBody);
  }

  // Delete a post
  @Delete(":userId/:postId")
  async deletePost(
    @Param("userId") userId: number,
    @Param("postId") postId: string
  ): Promise<PostEntity> {
    return this.postsService.deletePost(userId, postId);
  }
}
