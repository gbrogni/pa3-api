import { Accommodation } from "@/domain/hotel/enterprise/entities/accommodation";

export class AccommodationPresenter{

    static toHTTP(accommodation: Accommodation) {
        return {
            id: accommodation.id,
            name: accommodation.name,
            description: accommodation.description,
            price: accommodation.price,
            slug: accommodation.slug.value,
            status: accommodation.status
        }
    }

}