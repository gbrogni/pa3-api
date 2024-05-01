import { GetAccommodationAvailabilityUseCase } from '@/domain/hotel/application/use-cases/get-accommodation-availability';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';

@Controller('/accommodations/:id')
export class GetAccommodationAvailabilityController {

    constructor(
        private getAccommodationAvailabilityUseCase: GetAccommodationAvailabilityUseCase
    ) { }

    @Get()
    async handle(@Param('id') id: string) {
        const result = await this.getAccommodationAvailabilityUseCase.execute({ accommodationId: id });

        if (result.isLeft()) {
            throw new BadRequestException();
        }

        const notAvailableAt = result.value.notAvailableAt;

        return { notAvailableAt };
    }
}