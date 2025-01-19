import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../../authentication/guard/jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ description: 'Create user.', summary: 'Create user.' })
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
  public async findOne(@Req() request: Request) {
    const { userId } = request.user as { userId: string };

    const user = await this.userService.findOne({
      _id: new Types.ObjectId(userId),
    });

    user.password = undefined;

    return user;
  }
}
