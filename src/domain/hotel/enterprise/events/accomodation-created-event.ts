import { DomainEvent } from '@/core/events/domain-event';
import { Accommodation } from '../entities/accommodation';

export class AccomodationCreatedEvent implements DomainEvent {

    public ocurredAt: Date;
    public accomodation: Accommodation;

    constructor(accomodation: Accommodation) {
        this.ocurredAt = new Date();
        this.accomodation = accomodation;
    }

    public getAggregateId() {
        return this.accomodation.id;
    }

}