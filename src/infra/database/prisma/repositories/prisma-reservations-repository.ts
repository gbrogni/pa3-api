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

    async create(reservation: Reservation): Promise<void> {
        const data = PrismaReservationMapper.toPrisma(reservation);

        await this.prisma.reservation.create({
            data
        });
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