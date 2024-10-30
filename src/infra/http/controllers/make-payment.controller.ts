import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { MakePaymentUseCase } from '@/domain/hotel/application/use-cases/make-payment';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { CurrentUser } from '@/infra/auth/current-user-decorator';

@Controller('/reservations/make-payment')
export class MakePaymentController {

  constructor(
    private makePaymentUseCase: MakePaymentUseCase
  ) { }

  @Post()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body() body: { reservationAmounts: { [reservationId: string]: number; }; },
  ) {
    const { reservationAmounts } = body;
    const userId = user.sub;

    const result = await this.makePaymentUseCase.execute({
      reservationAmounts,
      userId
    });

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
  }

}
