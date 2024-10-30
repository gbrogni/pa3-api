import { ReservationsRepository } from '@/domain/hotel/application/repositories/reservations-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Reservation, ReservationStatus } from '@/domain/hotel/enterprise/entities/reservation';
import { PrismaReservationMapper } from '../mappers/prisma-reservation-mapper';

@Injectable()
export class PrismaReservationsRepository implements ReservationsRepository {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(reservations: Reservation[]): Promise<void> {
    const data = reservations.map(reservation => PrismaReservationMapper.toPrisma(reservation));

    await this.prisma.$transaction(
      data.map(reservationData => this.prisma.reservation.create({ data: reservationData }))
    );
  }

  async findById(reservationId: string): Promise<Reservation | null> {
    const reservation = await this.prisma.reservation.findFirst({
      where: {
        id: reservationId
      }
    });

    if (!reservation) {
      return null;
    }

    return PrismaReservationMapper.toDomain(reservation);
  }

  async updateStatus(reservationId: string, status: ReservationStatus): Promise<void> {
    await this.prisma.reservation.update({
      where: {
        id: reservationId
      },
      data: {
        status
      }
    });
  }
}