import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Payment } from '@/domain/hotel/enterprise/entities/payment';
import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from '../repositories/payments-repository';


interface MakePaymentUseCaseRequest {
    amount: number;
    paymentDate: Date;
    reservationId: string;
}

type MakePaymentUseCaseResponse = Either<null, { payment: Payment }>;

@Injectable()
export class MakePaymentUseCase {

    constructor(
        private paymentsRepository: PaymentsRepository,
    ) { }

    async execute({
        amount,
        paymentDate,
        reservationId,
    }: MakePaymentUseCaseRequest): Promise<MakePaymentUseCaseResponse> {

        const payment = Payment.create({
            amount,
            paymentDate,
            reservationId: new UniqueEntityID(reservationId)
        });

        await this.paymentsRepository.create(payment);

        return right({ payment });
    }

}