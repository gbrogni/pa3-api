import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface AccommodationImageProps {
    accommodationId: UniqueEntityID;
    imageId: UniqueEntityID;
    url: string;
}

export class AccommodationImage extends Entity<AccommodationImageProps> {

    get accommodationId() {
        return this.props.accommodationId;
    }

    get imageId() {
        return this.props.imageId;
    }

    get url() {
        return this.props.url;
    }

    static create(props: AccommodationImageProps, id?: UniqueEntityID) {
        return new AccommodationImage(props, id);
    }

}