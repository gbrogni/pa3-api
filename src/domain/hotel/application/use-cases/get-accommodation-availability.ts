import { Either, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { AccommodationsRepository } from '../repositories/accommodations-repository';

interface GetAccommodationAvailabilityUseCaseRequest {
    accommodationId: string;
}

type GetAccommodationAvailabilityUseCaseResponse = Either<null, { notAvailableAt: { checkIn: Date, checkOut: Date }[] }>;

@Injectable()
export class GetAccommodationAvailabilityUseCase {

    constructor(
        private accommodationsRepository: AccommodationsRepository,
    ) { }

    async execute({
        accommodationId
    }: GetAccommodationAvailabilityUseCaseRequest): Promise<GetAccommodationAvailabilityUseCaseResponse> {

        const notAvailableAt = await this.accommodationsRepository.findReservedDates(accommodationId);

        return right({ notAvailableAt });
    }

}