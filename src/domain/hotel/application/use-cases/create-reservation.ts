import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Reservation, ReservationStatus } from '@/domain/hotel/enterprise/entities/reservation';
import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from '../repositories/reservations-repository';

interface CreateReservationUseCaseRequest {
  checkIn: Date;
  checkOut: Date;
  accommodationId: string;
  userId: string;
}

type CreateReservationUseCaseResponse = Either<null, { reservationIds: string[]; }>;

@Injectable()
export class CreateReservationUseCase {

  constructor(
    private reservationsRepository: ReservationsRepository,
  ) { }

  async execute(requests: CreateReservationUseCaseRequest[]): Promise<CreateReservationUseCaseResponse> {
    const reservations = requests.map(request =>
      Reservation.create({
        checkIn: request.checkIn,
        checkOut: request.checkOut,
        accomodationId: new UniqueEntityID(request.accommodationId),
        userId: new UniqueEntityID(request.userId),
        status: ReservationStatus.PENDING
      })
    );
    
    await this.reservationsRepository.create(reservations);

    const reservationIds = reservations.map(reservation => reservation.id.toString());

    return right({ reservationIds });
  }
}