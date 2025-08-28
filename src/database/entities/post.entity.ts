import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'posts' })
export class PostEntity extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
