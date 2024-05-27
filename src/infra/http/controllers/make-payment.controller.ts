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
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { PaymentMethod } from '@/domain/hotel/enterprise/entities/payment';

const makePaymentBodySchema = z.object({
    amount: z.number(),
    paymentMethod: z.nativeEnum(PaymentMethod),
    cardNumber: z.string(),
    cardName: z.string(),
    expiryDate: z.string(),
    cvc: z.string(),
    reservationId: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(makePaymentBodySchema);

type MakePaymentBodySchema = z.infer<typeof makePaymentBodySchema>;

@Controller('/reservations/make-payment')
export class MakePaymentController {

    constructor(
        private makePaymentUseCase: MakePaymentUseCase
    ) { }

    @Post()
    @HttpCode(204)
    async handle(
        @Body(bodyValidationPipe) body: MakePaymentBodySchema,
    ) {
        const result = await this.makePaymentUseCase.execute({
            amount: body.amount,
            paymentDate: new Date(),
            reservationId: body.reservationId,
            paymentMethod: body.paymentMethod,
            cardNumber: body.cardNumber,
            cardName: body.cardName,
            expiryDate: new Date(body.expiryDate),
            cvc: body.cvc,
        });

        if (result.isLeft()) {
            throw new BadRequestException(result.value.message);
        }
    }

}
