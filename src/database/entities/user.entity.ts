import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PostEntity } from './post.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: 'password' })
  password: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
