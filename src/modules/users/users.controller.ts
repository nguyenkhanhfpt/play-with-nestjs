import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ApiErrorsResponse, ApiGetErrorsResponse } from '@decorators';
import { GetUserPostsResDto } from './dto/get-user-posts-res.dto';
import { Serialize } from '@interceptors';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created.',
  })
  @ApiErrorsResponse()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns a list of all users.' })
  @ApiGetErrorsResponse()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user with the specified ID.',
  })
  @ApiGetErrorsResponse()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully updated.',
  })
  @ApiErrorsResponse()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully deleted.',
  })
  @ApiGetErrorsResponse()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get(':id/posts')
  @ApiOperation({ summary: 'Get all posts by user' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all posts by user.',
    type: [GetUserPostsResDto],
  })
  @ApiGetErrorsResponse()
  @Serialize(GetUserPostsResDto)
  async findAllPosts(@Param('id') id: number): Promise<GetUserPostsResDto[]> {
    return this.usersService.findAllPosts(id);
  }
}
