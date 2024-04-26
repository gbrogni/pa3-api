import { AggregateRoot } from '@/core/entities/aggregate-root';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ReservationCreatedEvent } from '../events/reservation-created-event';

export enum ReservationStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
}

export interface ReservationProps {
    checkIn: Date;
    checkOut: Date;
    userId: UniqueEntityID;
    accomodationId: UniqueEntityID;
    status: ReservationStatus;
}

export class Reservation extends AggregateRoot<ReservationProps> {

    get checkIn() {
        return this.props.checkIn;
    }

    get checkOut() {
        return this.props.checkOut;
    }

    get guestId() {
        return this.props.userId;
    }

    get accomodationId() {
        return this.props.accomodationId;
    }

    get status() {
        return this.props.status;
    }

    cancel() {
        this.props.status = ReservationStatus.CANCELLED;
    }

    static create(props: ReservationProps, id?: UniqueEntityID) {
        const reservation = new Reservation({
            ...props
        }, id);

        if (id) {
            reservation.addDomainEvent(new ReservationCreatedEvent(reservation));
        }

        return reservation;
    }

}