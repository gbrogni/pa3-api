import { GetAccommodationBySlugUseCase } from '@/domain/hotel/application/use-cases/get-accommodation-by-slug';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AccommodationPresenter } from '../presenters/accommodation-presenter';

@Controller('/accommodations/:slug')
export class GetAccommodationBySlugController {

    constructor(
        private getAccommodationBySlugUseCase: GetAccommodationBySlugUseCase
    ) { }

    @Get()
    async handle(@Param('slug') slug: string) {
        const result = await this.getAccommodationBySlugUseCase.execute({ slug });

        if (result.isLeft()) {
            throw new BadRequestException();
        }

        const accommodation = result.value.accommodation;

        return { accommodation: AccommodationPresenter.toHTTP(accommodation) };
    }
}