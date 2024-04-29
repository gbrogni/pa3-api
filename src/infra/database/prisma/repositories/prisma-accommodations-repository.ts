import { AccommodationsRepository } from '@/domain/hotel/application/repositories/accommodations-repository';
import { Accommodation, AccommodationStatus } from '@/domain/hotel/enterprise/entities/accommodation';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { PrismaAccommodationMapper } from '../mappers/prisma-accommodation-mapper';

@Injectable()
export class PrismaAccommodationsRepository implements AccommodationsRepository {

    constructor(
        private prisma: PrismaService,
    ) { }

    async findAll({ page }: PaginationParams): Promise<Accommodation[]> {
        const accommodations = await this.prisma.accommodation.findMany({
            take: 20,
            skip: (page - 1) * 20,
        });

        return accommodations.map(PrismaAccommodationMapper.toDomain);
    }

    async findBySlug(slug: string): Promise<Accommodation | null> {
        const accommodation = await this.prisma.accommodation.findUnique({
            where: {
                slug
            }
        });

        if (!accommodation) {
            return null;
        }

        return PrismaAccommodationMapper.toDomain(accommodation);
    }

    async findByRange({ startDate, endDate }: { startDate: Date, endDate: Date }): Promise<Accommodation[]> {
        const accommodations = await this.prisma.accommodation.findMany({
            where: {
                status: 'AVAILABLE',
            },
            include: {
                Reservation: true,
            }
        });

        const availableAccommodations = accommodations.filter(accommodation => {
            const overlappingReservation = accommodation.Reservation.find(reservation => {
                return (
                    (startDate <= reservation.checkInDate && endDate >= reservation.checkOutDate)
                );
            });

            return !overlappingReservation;
        });

        return availableAccommodations.map(PrismaAccommodationMapper.toDomain);
    }

}