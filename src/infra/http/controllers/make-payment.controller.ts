import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Param,
    Post,
} from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { MakePaymentUseCase } from '@/domain/hotel/application/use-cases/make-payment';

const makePaymentBodySchema = z.object({
    amount: z.number(),
    paymentDate: z.date(),
});

const bodyValidationPipe = new ZodValidationPipe(makePaymentBodySchema);

type MakePaymentBodySchema = z.infer<typeof makePaymentBodySchema>;

@Controller('/reservations/:reservationId/make-payment')
export class MakePaymentController {

    constructor(
        private makePaymentUseCase: MakePaymentUseCase
    ) { }

    @Post()
    @HttpCode(204)
    async handle(
        @Param('reservationId') reservationId: string,
        @Body(bodyValidationPipe) body: MakePaymentBodySchema,
    ) {
        const result = await this.makePaymentUseCase.execute({
            amount: body.amount,
            paymentDate: body.paymentDate,
            reservationId,
        });

        if (result.isLeft()) {
            throw new BadRequestException(result.value.message);
        }

        return result.value;
    }

}
