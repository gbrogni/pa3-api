import { Either, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Accommodation } from '@/domain/hotel/enterprise/entities/accommodation';
import { AccommodationsRepository } from '../repositories/accommodations-repository';

interface FetchAccommodationsByRangeUseCaseRequest {
    startDate: Date;
    endDate: Date;
}

type FetchAccommodationsByRangeUseCaseResponse = Either<null, { accommodations: Accommodation[] }>;

@Injectable()
export class FetchAccommodationsByRangeUseCase {

    constructor(
        private accommodationsRepository: AccommodationsRepository,
    ) { }

    async execute({
        startDate,
        endDate
    }: FetchAccommodationsByRangeUseCaseRequest): Promise<FetchAccommodationsByRangeUseCaseResponse> {

        const accommodations = await this.accommodationsRepository.findByRange({ startDate, endDate });

        return right({ accommodations });
    }

}