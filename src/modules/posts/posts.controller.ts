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
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User as UserDecorator } from '@decorators/user.decorator';
import { UserEntity } from '@database/entities/user.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ApiErrorResponse, ApiGetErrorResponse } from '@decorators';

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
  @ApiErrorResponse()
  create(
    @Body() createPostDto: CreatePostDto,
    @UserDecorator('id') userId: number,
  ) {
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Returns a list of all posts.' })
  @ApiGetErrorResponse()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Returns the post with the specified ID.',
  })
  @ApiGetErrorResponse()
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiParam({ name: 'id', description: 'Post ID', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Post has been successfully updated.',
  })
  @ApiErrorResponse()
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
  @ApiGetErrorResponse()
  remove(@Param('id') id: string, @UserDecorator() user: UserEntity) {
    return this.postsService.remove(+id, user.id);
  }
}
