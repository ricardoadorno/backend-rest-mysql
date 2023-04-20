import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from "typeorm";
import PostEntity from "../posts/post.entity";

@Entity()
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  @Unique(["email"])
  email: string;

  @Column()
  role: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
