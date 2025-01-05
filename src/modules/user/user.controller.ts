import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/guard/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ description: 'Create user', summary: 'Create user' })
  public async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);

    return { message: ['Usuário criado com sucesso'] };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'fetch logged user info',
    summary: 'fetch logged user info',
  })
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ['__v', 'password'],
  })
  public async findOne() {
    const user = await this.userService.findOne({});
    return {
      ...user,
      _id: user._id.toString(),
    };
  }
}
