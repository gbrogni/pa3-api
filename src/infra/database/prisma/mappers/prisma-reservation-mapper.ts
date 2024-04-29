import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Reservation, ReservationStatus } from '@/domain/hotel/enterprise/entities/reservation';
import { $Enums, Reservation as PrismaReservation, Prisma } from '@prisma/client';

export class PrismaReservationMapper {

    static toDomain(reservation: PrismaReservation): Reservation {
        return Reservation.create({
            checkIn: reservation.checkInDate,
            checkOut: reservation.checkOutDate,
            userId: new UniqueEntityID(reservation.userId),
            accomodationId: new UniqueEntityID(reservation.accommodationId),
            status: this.mapStatus(reservation.status)
        }, new UniqueEntityID(reservation.id))
    }

    static toPrisma(reservation: Reservation): Prisma.ReservationUncheckedCreateInput {
        return {
            id: reservation.id.toString(),
            checkInDate: reservation.checkIn,
            checkOutDate: reservation.checkOut,
            userId: reservation.guestId.toString(),
            accommodationId: reservation.accomodationId.toString(),
            status: reservation.status
        }
    }

    private static mapStatus(status: $Enums.ReservationStatus): ReservationStatus {
        switch (status) {
            case 'PENDING':
                return ReservationStatus.PENDING;
            case 'CONFIRMED':
                return ReservationStatus.CONFIRMED;
            case 'CANCELLED':
                return ReservationStatus.CANCELLED;
            default:
                throw new Error(`Invalid status: ${status}`);
        }
    }
}
