import { Accommodation } from '@/domain/hotel/enterprise/entities/accommodation';

export abstract class AccommodationsRepository {
    abstract findAll({ page }: { page: number }): Promise<Accommodation[]>;
    abstract findBySlug(slug: string): Promise<Accommodation | null>;
    abstract findByRange({ page, startDate, endDate }: { page: number, startDate: Date, endDate: Date }): Promise<Accommodation[]>;
    abstract findReservedDates(accommodationId: string): Promise<{ checkIn: Date, checkOut: Date }[]>;
}