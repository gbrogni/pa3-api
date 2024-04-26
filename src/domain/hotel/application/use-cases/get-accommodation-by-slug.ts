import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Accommodation } from '@/domain/hotel/enterprise/entities/accommodation';
import { Injectable } from '@nestjs/common';
import { AccommodationsRepository } from '../repositories/accommodations-repository';

interface GetAccommodationBySlugUseCaseRequest {
    slug: string;
}

type GetAccommodationBySlugUseCaseResponse = Either<ResourceNotFoundError, { accommodation: Accommodation }>;

@Injectable()
export class GetAccommodationBySlugUseCase {

    constructor(
        private accommodationsRepository: AccommodationsRepository,
    ) { }

    async execute({
        slug,
    }: GetAccommodationBySlugUseCaseRequest): Promise<GetAccommodationBySlugUseCaseResponse> {

        const accommodation = await this.accommodationsRepository.findBySlug(slug);

        if (!accommodation) {
            return left(new ResourceNotFoundError());
        }

        return right({ accommodation });
    }

}