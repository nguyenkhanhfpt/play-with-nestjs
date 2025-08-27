import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  user?: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
