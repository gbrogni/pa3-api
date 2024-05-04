import {
    BadRequestException,
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import { ValidatePaymentUseCase } from '@/domain/hotel/application/use-cases/validate-payment';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { CurrentUser } from '@/infra/auth/current-user-decorator';

@Controller('/reservations/:reservationId/validate-payment')
export class ValidatePaymentController {

    constructor(
        private validatePaymentUseCase: ValidatePaymentUseCase
    ) { }

    @Get()
    async handle(
        @CurrentUser() user: UserPayload,
        @Param('reservationId') reservationId: string,
    ) {
        const userId = user.sub;

        const result = await this.validatePaymentUseCase.execute({
            reservationId,
            userId,
        });

        if (result.isLeft()) {
            throw new BadRequestException();
        }
    }

}