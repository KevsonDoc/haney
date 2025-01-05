import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  public async create(
    @Body() createAuthenticationDto: CreateAuthenticationDto,
  ) {
    return await this.authenticationService.signIn(createAuthenticationDto);
  }
}
