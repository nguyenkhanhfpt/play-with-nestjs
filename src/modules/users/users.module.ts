import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@database/entities/user.entity';
import { UsersResolver } from './user.resolver';
import { PostEntity } from '@database/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
