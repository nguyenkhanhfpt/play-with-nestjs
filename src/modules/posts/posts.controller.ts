import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/req/update-post.dto';
import { User as UserDecorator } from '@decorators/user.decorator';
import { UserEntity } from '@database/entities/user.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ApiErrorsResponse, ApiGetErrorsResponse } from '@decorators';
import { CreatePostDto } from './dto/req/create-post.dto';
import { PostItemDto } from './dto/res/post-res.dto';

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post has been successfully created.',
  })
  @ApiErrorsResponse()
  create(
    @Body() createPostDto: CreatePostDto,
    @UserDecorator('id') userId: number,
  ) {
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all posts.',
    type: [PostItemDto],
  })
  @ApiGetErrorsResponse()
  findAll(): Promise<PostItemDto[]> {
    return this.postsService.getPostList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Returns the post with the specified ID.',
    type: PostItemDto,
  })
  @ApiGetErrorsResponse()
  findOne(@Param('id') id: string): Promise<PostItemDto> {
    return this.postsService.getPostDetail(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiParam({ name: 'id', description: 'Post ID', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Post has been successfully updated.',
  })
  @ApiErrorsResponse()
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UserDecorator() user: UserEntity,
  ) {
    return this.postsService.update(+id, updatePostDto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({ name: 'id', description: 'Post ID', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Post has been successfully deleted.',
  })
  @ApiGetErrorsResponse()
  remove(@Param('id') id: string, @UserDecorator() user: UserEntity) {
    return this.postsService.remove(+id, user.id);
  }
}
