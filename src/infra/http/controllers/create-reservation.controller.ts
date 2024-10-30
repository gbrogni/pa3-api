import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { CreateReservationUseCase } from '@/domain/hotel/application/use-cases/create-reservation';

const createReservationBodySchema = z.array(z.object({
  checkIn: z.string(),
  checkOut: z.string(),
  accommodationId: z.string()
}));

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
    const userId = user.sub;
    const reservations = body.map(reservation => ({
      ...reservation,
      checkIn: new Date(reservation.checkIn),
      checkOut: new Date(reservation.checkOut),
      userId
    }));

    const result = await this.createReservationUseCase.execute(reservations);

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return result.value;
  }
}