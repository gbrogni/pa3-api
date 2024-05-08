import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AggregateRoot } from '@/core/entities/aggregate-root';
import { Slug } from './value-objects/slug';
import { AccommodationImageList } from './accommodation-image-list';
import { Optional } from '@/core/types/optional';
import { ReservationList } from './reservation-list';

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
    images: AccommodationImageList;
    reservations: ReservationList;
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

    get images() {
        return this.props.images;
    }

    get reservations() {
        return this.props.reservations;
    }

    static create(
        props: Optional<AccommodationProps, 'slug' | 'images' | 'reservations'>,
        id?: UniqueEntityID,
    ) {
        const accommodation = new Accommodation(
            {
                ...props,
                slug: props.slug ?? Slug.createFromText(props.name),
                images: props.images ?? new AccommodationImageList(),
                reservations: props.reservations ?? new ReservationList(),
            },
            id,
        );

        return accommodation;
    }

}