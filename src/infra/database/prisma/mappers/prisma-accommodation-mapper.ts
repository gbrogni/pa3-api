import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Accommodation, AccommodationStatus } from '@/domain/hotel/enterprise/entities/accommodation';
import { Slug } from '@/domain/hotel/enterprise/entities/value-objects/slug';
import { $Enums, Prisma, Accommodation as PrismaAccommodation } from '@prisma/client';

export class PrismaAccommodationMapper {

    static toDomain(accommodation: PrismaAccommodation): Accommodation {
        return Accommodation.create({
            name: accommodation.name,
            description: accommodation.description,
            slug: Slug.create(accommodation.slug),
            price: accommodation.price,
            status: this.mapStatus(accommodation.status)
        }, new UniqueEntityID(accommodation.id));
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