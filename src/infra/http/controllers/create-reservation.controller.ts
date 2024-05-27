import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { CreateReservationUseCase } from '@/domain/hotel/application/use-cases/create-reservation';

const createReservationBodySchema = z.object({
    checkIn: z.string(),
    checkOut: z.string(),
    accommodationId: z.string()
});

const bodyValidationPipe = new ZodValidationPipe(createReservationBodySchema);

type CreateReservationBodySchema = z.infer<typeof createReservationBodySchema>;

@Controller('/reservations')
export class CreateReservationController {

    constructor(
        private createReservationUseCase: CreateReservationUseCase
    ) { }

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: CreateReservationBodySchema,
        @CurrentUser() user: UserPayload,
    ) {
        const { checkIn, checkOut, accommodationId } = body;
        const userId = user.sub;

        const result = await this.createReservationUseCase.execute({
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            userId,
            accommodationId
        });

        if (result.isLeft()) {
            throw new BadRequestException();
        }

        return result.value;
    }
}