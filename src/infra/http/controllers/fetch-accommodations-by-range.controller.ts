import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { FetchAccommodationsByRangeUseCase } from '@/domain/hotel/application/use-cases/fetch-accommodations-by-range';
import { AccommodationPresenter } from '../presenters/accommodation-presenter';

const pageQueryParamSchema = z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/accommodations/by-range')
export class FetchAccommodationsByRangeController {

    constructor(
        private fetchAccommodationsByRangeUseCase: FetchAccommodationsByRangeUseCase
    ) { }

    @Get()
    async handle(
        @Query('page', queryValidationPipe) page: PageQueryParamSchema,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string) {
        const result = await this.fetchAccommodationsByRangeUseCase.execute({ page, startDate: new Date(startDate), endDate: new Date(endDate) });

        if (result.isLeft()) {
            throw new BadRequestException();
        }

        const accommodations = result.value.accommodations;

        return { accommodations: accommodations.map(AccommodationPresenter.toHTTP) };
    }
}
