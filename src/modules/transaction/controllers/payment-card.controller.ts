import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/authentication/guard/jwt-auth.guard';
import { CreatePaymentCardDto } from '../dto/create-payment-card.dto';
import { PaymentCardService } from '../service/payment-card.service.service';

@ApiTags('Payment Card')
@Controller('payment-card/:profileId')
@UseGuards(JwtAuthGuard)
export class PaymentCardController {
  constructor(private readonly paymentCardService: PaymentCardService) {}

  @ApiOperation({
    summary: 'Create paryment card.',
    description: 'Create paryment card.',
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreatePaymentCardDto })
  @Post()
  public async create(
    @Param('profileId') profileId: string,
    @Body() payload: CreatePaymentCardDto,
  ) {
    await this.paymentCardService.create(profileId, payload);
    return ['Payment card created successfully'];
  }

  @Get()
  public async find(@Param('profileId') profileId: string) {}

  @Get()
  public async findOne(@Param('profileId') profileId: string) {}
}
