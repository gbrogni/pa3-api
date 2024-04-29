import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateUserUseCase } from '@/domain/hotel/application/use-cases/authenticate-user';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateUserUseCase } from '@/domain/hotel/application/use-cases/create-user';
import { CancelReservationController } from './controllers/cancel-reservation.controller';
import { CancelReservationUseCase } from '@/domain/hotel/application/use-cases/cancel-reservation';
import { FetchAccommodationsController } from './controllers/fetch-accommodations.controller';
import { FetchAccommodationsUseCase } from '@/domain/hotel/application/use-cases/fetch-accommodations';
import { GetAccommodationBySlugController } from './controllers/get-accommodation-by-slug.controller';
import { GetAccommodationBySlugUseCase } from '@/domain/hotel/application/use-cases/get-accommodation-by-slug';

@Module({
    imports: [DatabaseModule, CryptographyModule],
    controllers: [
        AuthenticateController,
        CancelReservationController,
        CreateAccountController,
        FetchAccommodationsController,
        GetAccommodationBySlugController
    ],
    providers: [
        AuthenticateUserUseCase,
        CancelReservationUseCase,
        CreateUserUseCase,
        FetchAccommodationsUseCase,
        GetAccommodationBySlugUseCase
    ]
})
export class HttpModule { }