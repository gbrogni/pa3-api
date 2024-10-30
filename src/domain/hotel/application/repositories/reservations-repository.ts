import { Reservation, ReservationStatus } from '@/domain/hotel/enterprise/entities/reservation';

export abstract class ReservationsRepository {
    abstract create(reservation: Reservation[]): Promise<void>;
    abstract findById(id: string): Promise<Reservation | null>;
    abstract updateStatus(id: string, status: ReservationStatus): Promise<void>;
}