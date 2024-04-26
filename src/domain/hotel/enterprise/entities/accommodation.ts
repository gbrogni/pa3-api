import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AggregateRoot } from '@/core/entities/aggregate-root';
import { AccomodationCreatedEvent } from '../events/accomodation-created-event';
import { Slug } from './value-objects/slug';

export enum AccommodationStatus {
    AVAILABLE = 'AVAILABLE',
    PENDING = 'PENDING',
    RESERVED = 'RESERVED'
}

export interface AccommodationProps {
    name: string;
    description: string;
    slug: Slug;
    price: number;
    status: AccommodationStatus;
}

export class Accommodation extends AggregateRoot<AccommodationProps> {

    get name() {
        return this.props.name;
    }

    get description() {
        return this.props.description;
    }

    get slug() {
        return this.props.slug;
    }

    get price() {
        return this.props.price;
    }

    get status() {
        return this.props.status;
    }

    static create(props: AccommodationProps, id?: UniqueEntityID) {
        const accomodation = new Accommodation({
            ...props
        });

        if (id) {
            accomodation.addDomainEvent(new AccomodationCreatedEvent(accomodation));
        }

        return accomodation;
    }

}