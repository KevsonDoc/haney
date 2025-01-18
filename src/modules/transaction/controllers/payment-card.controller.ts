import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/authentication/guard/jwt-auth.guard';
import { CreatePaymentCardDto } from '../dto/create-payment-card.dto';
import { FindPaymentCardDto } from '../dto/find-payment.dto';
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

  @ApiOperation({
    summary: 'List paryment card.',
    description: 'List paryment card.',
  })
  @ApiBearerAuth()
  @Get()
  public async find(
    @Param('profileId') profileId: string,
    @Query() query: FindPaymentCardDto,
  ) {
    const paymentCard = await this.paymentCardService.find(profileId, query);

    return paymentCard;
  }
}
