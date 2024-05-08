import { AccommodationsRepository } from '@/domain/hotel/application/repositories/accommodations-repository';
import { Accommodation } from '@/domain/hotel/enterprise/entities/accommodation';
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
            include: {
                Image: true,
                Reservation: true,
            },
            take: 20,
            skip: (page - 1) * 20,
        });

        return accommodations.map(accommodation => PrismaAccommodationMapper.toDomain(accommodation, accommodation.Image, accommodation.Reservation));
    }

    async findBySlug(slug: string): Promise<Accommodation | null> {
        const accommodation = await this.prisma.accommodation.findUnique({
            include: {
                Image: true,
                Reservation: true,
            },
            where: {
                slug
            }
        });

        if (!accommodation) {
            return null;
        }

        return PrismaAccommodationMapper.toDomain(accommodation, accommodation.Image);
    }

    async findByRange({ page, startDate, endDate }: { page: number, startDate: Date, endDate: Date; }): Promise<Accommodation[]> {
        const accommodations = await this.prisma.accommodation.findMany({
            take: 20,
            skip: (page - 1) * 20,
            where: {
                status: 'AVAILABLE',
            },
            include: {
                Reservation: true,
                Image: true,
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

        return availableAccommodations.map(accommodation => PrismaAccommodationMapper.toDomain(accommodation, accommodation.Image));
    }

    async findReservedDates(accommodationId: string): Promise<{ checkIn: Date, checkOut: Date; }[]> {
        const reservations = await this.prisma.reservation.findMany({
            where: {
                accommodationId: accommodationId,
                status: 'CONFIRMED'
            },
            select: {
                checkInDate: true,
                checkOutDate: true
            }
        });

        const reservedDates = reservations.map(reservation => {
            return {
                checkIn: new Date(reservation.checkInDate),
                checkOut: new Date(reservation.checkOutDate)
            };
        });

        return reservedDates;
    }

}