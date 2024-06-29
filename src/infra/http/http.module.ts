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
import { GetAccommodationAvailabilityController } from './controllers/get-accommodation-availability.controller';
import { GetAccommodationAvailabilityUseCase } from '@/domain/hotel/application/use-cases/get-accommodation-availability';
import { FetchAccommodationsByRangeController } from './controllers/fetch-accommodations-by-range.controller';
import { FetchAccommodationsByRangeUseCase } from '@/domain/hotel/application/use-cases/fetch-accommodations-by-range';
import { MakePaymentController } from './controllers/make-payment.controller';
import { MakePaymentUseCase } from '@/domain/hotel/application/use-cases/make-payment';
import { StorageModule } from '../storage/storage.module';
import { GetUserInfoController } from './controllers/get-user-info.controller';
import { GetUserInfoUseCase } from '@/domain/hotel/application/use-cases/get-user-info';
import { CreateReservationController } from './controllers/create-reservation.controller';
import { CreateReservationUseCase } from '@/domain/hotel/application/use-cases/create-reservation';
import { GeneratePixController } from './controllers/generate-pix.controller';
import { GenerateQRCodePixUseCase } from '@/domain/hotel/application/use-cases/make-pix';

@Module({
    imports: [DatabaseModule, CryptographyModule, StorageModule],
    controllers: [
        AuthenticateController,
        CancelReservationController,
        CreateAccountController,
        CreateReservationController,
        FetchAccommodationsByRangeController,
        FetchAccommodationsController,
        GetAccommodationAvailabilityController,
        GetAccommodationBySlugController,
        GetUserInfoController,
        MakePaymentController,
        GeneratePixController,
    ],
    providers: [
        AuthenticateUserUseCase,
        CancelReservationUseCase,
        CreateUserUseCase,
        CreateReservationUseCase,
        FetchAccommodationsByRangeUseCase,
        FetchAccommodationsUseCase,
        GenerateQRCodePixUseCase,
        {
            provide: 'VERSION',
            useValue: '01', 
        },
        GetAccommodationAvailabilityUseCase,
        GetAccommodationBySlugUseCase,
        GetUserInfoUseCase,
        MakePaymentUseCase,
    ],
    
})
export class HttpModule { }