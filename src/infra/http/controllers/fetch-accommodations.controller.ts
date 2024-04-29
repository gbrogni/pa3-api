import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { FetchAccommodationsUseCase } from '@/domain/hotel/application/use-cases/fetch-accommodations';
import { AccommodationPresenter } from '../presenters/accommodation-presenter';

const pageQueryParamSchema = z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/accommodations')
export class FetchAccommodationsController {

    constructor(
        private fetchAccommodationsUseCase: FetchAccommodationsUseCase
    ) { }

    @Get()
    async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
        const result = await this.fetchAccommodationsUseCase.execute({ page });

        if (result.isLeft()) {
            throw new BadRequestException();
        }

        const accommodations = result.value.accommodations;

        return { accommodations: accommodations.map(AccommodationPresenter.toHTTP) };
    }
}