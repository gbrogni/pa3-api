import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Reservation, ReservationStatus } from '@/domain/hotel/enterprise/entities/reservation';
import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from '../repositories/reservations-repository';

interface CreateReservationUseCaseRequest {
    checkIn: Date;
    checkOut: Date;
    accomodationId: string;
    userId: string;
}

type CreateReservationUseCaseResponse = Either<null, { reservation: Reservation }>;

@Injectable()
export class CreateReservationUseCase {

    constructor(
        private reservationsRepository: ReservationsRepository,
    ) { }

    async execute({
        checkIn,
        checkOut,
        accomodationId,
        userId,
    }: CreateReservationUseCaseRequest): Promise<CreateReservationUseCaseResponse> {

        const reservation = Reservation.create({
            checkIn,
            checkOut,
            accomodationId: new UniqueEntityID(accomodationId),
            userId: new UniqueEntityID(userId),
            status: ReservationStatus.PENDING
        });

        await this.reservationsRepository.create(reservation);

        return right({ reservation });
    }

}