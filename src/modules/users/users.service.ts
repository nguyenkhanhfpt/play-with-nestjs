import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@database/entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PostEntity } from '@database/entities/post.entity';
import { GetUserPostsResDto } from './dto/get-user-posts-res.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneBy(
    where: FindOptionsWhere<UserEntity>,
    select?: (keyof UserEntity)[],
    relations?: string[],
  ) {
    return this.userRepository.findOne({
      select: select,
      relations: relations,
      where,
    });
  }

  async findAllPosts(userId: number): Promise<GetUserPostsResDto[]> {
    const posts = await this.postRepository
      .createQueryBuilder('p')
      .select(['p.id', 'p.title', 'p.content', 'p.createdAt'])
      .where('p.userId = :userId', { userId })
      .orderBy('p.createdAt', 'DESC')
      .getMany();

    return posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
    }));
  }
}
