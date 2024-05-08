import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Accommodation, AccommodationStatus } from '@/domain/hotel/enterprise/entities/accommodation';
import { AccommodationImage, AccommodationImageProps } from '@/domain/hotel/enterprise/entities/accommodation-image';
import { AccommodationImageList } from '@/domain/hotel/enterprise/entities/accommodation-image-list';
import { ReservationList } from '@/domain/hotel/enterprise/entities/reservation-list';
import { Slug } from '@/domain/hotel/enterprise/entities/value-objects/slug';
import { $Enums, Accommodation as PrismaAccommodation } from '@prisma/client';
import { Image as PrismaImage } from '@prisma/client';
import { Reservation as PrismaReservation } from '@prisma/client';
import { PrismaReservationMapper } from './prisma-reservation-mapper';

export class PrismaAccommodationMapper {

    static toDomain(accommodation: PrismaAccommodation, images: PrismaImage[], reservations?: PrismaReservation[]): Accommodation {
        const mappedImages = images.map(image => this.mapImage(image));
        const accommodationImages = new AccommodationImageList(mappedImages);

        const mappedReservations = reservations?.map(reservation => PrismaReservationMapper.toDomain(reservation));
        const accommodationReservations = new ReservationList(mappedReservations);

        return Accommodation.create({
            name: accommodation.name,
            description: accommodation.description,
            slug: Slug.create(accommodation.slug),
            price: accommodation.price,
            status: PrismaAccommodationMapper.mapStatus(accommodation.status),
            images: accommodationImages,
            reservations: accommodationReservations
        }, new UniqueEntityID(accommodation.id));
    }

    private static mapImage(image: PrismaImage): AccommodationImage {
        const props: AccommodationImageProps = {
            accommodationId: new UniqueEntityID(image.accommodationId),
            imageId: new UniqueEntityID(image.id),
            url: image.url
        };

        return AccommodationImage.create(props);
    }

    private static mapStatus(status: $Enums.AccommodationStatus): AccommodationStatus {
        switch (status) {
            case 'AVAILABLE':
                return AccommodationStatus.AVAILABLE;
            case 'PENDING':
                return AccommodationStatus.PENDING;
            case 'RESERVED':
                return AccommodationStatus.RESERVED;
            default:
                throw new Error(`Invalid status: ${status}`);
        }
    }

}