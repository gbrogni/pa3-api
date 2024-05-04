import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from '@/domain/hotel/application/repositories/users-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { AccommodationsRepository } from '@/domain/hotel/application/repositories/accommodations-repository';
import { PrismaAccommodationsRepository } from './prisma/repositories/prisma-accommodations-repository';
import { ReservationsRepository } from '@/domain/hotel/application/repositories/reservations-repository';
import { PrismaReservationsRepository } from './prisma/repositories/prisma-reservations-repository';
import { PaymentsRepository } from '@/domain/hotel/application/repositories/payments-repository';
import { PrismaPaymentsRepository } from './prisma/repositories/prisma-payments-repository';

@Module({
    imports: [],
    providers: [
        PrismaService,
        {
            provide: UsersRepository,
            useClass: PrismaUsersRepository
        },
        {
            provide: AccommodationsRepository,
            useClass: PrismaAccommodationsRepository
        },
        {
            provide: ReservationsRepository,
            useClass: PrismaReservationsRepository
        },
        {
            provide: PaymentsRepository,
            useClass: PrismaPaymentsRepository
        }
    ],
    exports: [
        PrismaService,
        UsersRepository,
        ReservationsRepository,
        AccommodationsRepository,
        PaymentsRepository
    ]
})
export class DatabaseModule { }