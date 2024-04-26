import { DomainEvent } from '@/core/events/domain-event';
import { Reservation } from '../entities/reservation';

export class ReservationCreatedEvent implements DomainEvent {

    public ocurredAt: Date;
    public reservation: Reservation;

    constructor(reservation: Reservation) {
        this.ocurredAt = new Date();
        this.reservation = reservation;
    }

    public getAggregateId() {
        return this.reservation.id;
    }

}