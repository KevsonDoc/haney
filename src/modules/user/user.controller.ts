import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
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
  @ApiOperation({
    description: 'fetch logged user info',
    summary: 'fetch logged user info',
  })
  public async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
