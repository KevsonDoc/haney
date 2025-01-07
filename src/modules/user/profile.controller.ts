import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../authentication/guard/jwt-auth.guard';
import { CreateProfile } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Create profile user info',
    summary: 'Create profile user info',
  })
  public async create(
    @Req() request: Request & { user: { userId: string } },
    @Body() payload: CreateProfile,
  ) {
    await this.profileService.create(request.user.userId, payload);
    return { message: ['Profile add with sucessifuly'] };
  }
}
