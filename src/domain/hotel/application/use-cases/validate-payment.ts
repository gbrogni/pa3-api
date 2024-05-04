import { Either, left, right } from '@/core/either';
import { Payment } from '@/domain/hotel/enterprise/entities/payment';
import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from '../repositories/payments-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { ReservationsRepository } from '../repositories/reservations-repository';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface ValidatePaymentUseCaseRequest {
    reservationId: string;
    userId: string;
}

type ValidatePaymentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { payment: Payment }>;

@Injectable()
export class ValidatePaymentUseCase {

    constructor(
        private paymentsRepository: PaymentsRepository,
        private reservationsRepository: ReservationsRepository
    ) { }

    async execute({
        reservationId,
        userId
    }: ValidatePaymentUseCaseRequest): Promise<ValidatePaymentUseCaseResponse> {

        const reservation = await this.reservationsRepository.findById(reservationId);

        if (!reservation) {
            return left(new ResourceNotFoundError());
        }

        if (reservation.guestId.toString() !== userId) {
            return left(new NotAllowedError());
        }

        const payment = await this.paymentsRepository.findByReservationId(reservationId);

        if (!payment) {
            return left(new ResourceNotFoundError());
        }

        return right({ payment });

    }

}