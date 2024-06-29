import { Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Payment } from '@/domain/hotel/enterprise/entities/payment';
import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from '../repositories/payments-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { ReservationStatus } from '../../enterprise/entities/reservation';
import { ReservationsRepository } from '../repositories/reservations-repository';
import { PixPayment } from '../../enterprise/entities/pix-payment';

interface MakePaymentUseCaseRequest {
    userId: string;
    reservationId: string;
    value: number;
}

type MakePaymentUseCaseResponse = Either<ResourceNotFoundError, boolean>;

@Injectable()
export class MakePaymentUseCase {

    constructor(
        private paymentsRepository: PaymentsRepository,
        private reservationsRepository: ReservationsRepository
    ) { }

    async execute({ reservationId, userId, value }: MakePaymentUseCaseRequest): Promise<MakePaymentUseCaseResponse> {

        const reservation = await this.reservationsRepository.findById(reservationId);

        if (!reservation) {
            return left(new ResourceNotFoundError());
        }

        const pix = PixPayment.create({
            reservationId,
            userId,
            value
        });

        await this.reservationsRepository.updateStatus(reservationId, ReservationStatus.CONFIRMED);
        await this.paymentsRepository.create(pix);

        return right(true);
    }

}