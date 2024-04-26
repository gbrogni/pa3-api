import { Either, left, right } from '@/core/either';
import { Reservation } from '@/domain/hotel/enterprise/entities/reservation';
import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from '../repositories/reservations-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface CancelReservationUseCaseRequest {
    reservationId: string;
    userId: string;
}

type CancelReservationUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { reservation: Reservation }>;

@Injectable()
export class CancelReservationUseCase {

    constructor(
        private reservationsRepository: ReservationsRepository,
    ) { }

    async execute({
        reservationId,
        userId
    }: CancelReservationUseCaseRequest): Promise<CancelReservationUseCaseResponse> {

        const reservation = await this.reservationsRepository.findById(reservationId);

        if (!reservation) {
            return left(new ResourceNotFoundError());
        }

        if (userId !== reservation.guestId.toString()) {
            return left(new NotAllowedError());
        }

        reservation.cancel();

        await this.reservationsRepository.save(reservation);

        return right({ reservation });
    }

}