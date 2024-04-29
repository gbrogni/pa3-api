import {
    BadRequestException,
    Controller,
    Param,
    Patch,
} from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { CancelReservationUseCase } from '@/domain/hotel/application/use-cases/cancel-reservation';

@Controller('/reservations/:reservationId/cancel')
export class CancelReservationController {

    constructor(
        private cancelReservationUseCase: CancelReservationUseCase
    ) { }

    @Patch()
    async handle(
        @CurrentUser() user: UserPayload,
        @Param('reservationId') reservationId: string
    ) {
        const userId = user.sub;

        const result = await this.cancelReservationUseCase.execute({
            reservationId,
            userId,
        });

        if (result.isLeft()) {
            throw new BadRequestException();
        }
    }

}