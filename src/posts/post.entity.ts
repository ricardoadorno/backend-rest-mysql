import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import UserEntity from "src/users/user.entity";
import { v4 as uuidv4 } from "uuid";

@Entity()
export default class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
