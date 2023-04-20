import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import PostEntity from "./post.entity";
import UserEntity from "src/users/user.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  async findAllPostsForUser(userId: number): Promise<PostEntity[]> {
    return this.postRepository.find({
      where: { user: { id: userId } },
    });
  }

  async createPost(userId: number, postBody: PostEntity): Promise<PostEntity> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    const commentPost = this.postRepository.create({
      title: postBody.title,
      content: postBody.content,
      user,
    });

    return this.postRepository.save(commentPost);
  }

  async updatePost(
    userId: number,
    postId: string,
    postBody: PostEntity
  ): Promise<PostEntity> {
    await this.postRepository.update(postId, postBody);

    return this.postRepository.findOneOrFail({
      where: { id: postId },
    });
  }

  async deletePost(userId: number, postId: string): Promise<PostEntity> {
    await this.postRepository.delete(postId);

    return;
  }
}
