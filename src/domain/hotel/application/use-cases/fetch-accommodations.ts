import { Either, right } from '@/core/either';
import { Accommodation } from '@/domain/hotel/enterprise/entities/accommodation';
import { Injectable } from '@nestjs/common';
import { AccommodationsRepository } from '../repositories/accommodations-repository';

interface FetchAccommodationsUseCaseRequest {
  page: number;
}

type FetchAccommodationsUseCaseResponse = Either<null, { accommodations: Accommodation[] }>;

@Injectable()
export class FetchAccommodationsUseCase {

  constructor(
    private accommodationsRepository: AccommodationsRepository,
  ) { }

  async execute({
    page,
  }: FetchAccommodationsUseCaseRequest): Promise<FetchAccommodationsUseCaseResponse> {

    const accommodations = await this.accommodationsRepository.findAll({ page });

    return right({ accommodations });
  }

}