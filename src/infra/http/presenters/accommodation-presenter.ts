import { Accommodation } from "@/domain/hotel/enterprise/entities/accommodation";

export class AccommodationPresenter {
    static toHTTP(accommodation: Accommodation) {
        return {
            id: accommodation.id.toString(),
            name: accommodation.name,
            description: accommodation.description,
            price: accommodation.price,
            slug: accommodation.slug.value,
            status: accommodation.status,
            images: accommodation.images.getItems().map(image => ({
                id: image.imageId.toString(),
                accommodationId: image.accommodationId.toString(),
                url: image.url
            })),
            reservations: accommodation.reservations.getItems().map(reservation => ({
                id: reservation.id.toString(),
                accommodationId: reservation.accomodationId.toString(),
                checkIn: reservation.checkIn,
                checkOut: reservation.checkOut,
                status: reservation.status
            }))
        };
    }
}