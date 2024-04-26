import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateUserUseCase } from '@/domain/hotel/application/use-cases/authenticate-user';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateUserUseCase } from '@/domain/hotel/application/use-cases/create-user';

@Module({
    imports: [DatabaseModule, CryptographyModule],
    controllers: [
        AuthenticateController,
        CreateAccountController,
    ],
    providers: [
        AuthenticateUserUseCase,
        CreateUserUseCase
    ]
})
export class HttpModule { }