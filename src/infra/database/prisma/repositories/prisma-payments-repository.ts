import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaymentsRepository } from '@/domain/hotel/application/repositories/payments-repository';
import { PixPayment } from '@/domain/hotel/enterprise/entities/pix-payment';
import { PrismaPixPaymentMapper } from '../mappers/prisma-pix-payment-mapper';

@Injectable()
export class PrismaPaymentsRepository implements PaymentsRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async create(payment: PixPayment): Promise<void> {
        const data = PrismaPixPaymentMapper.toPrisma(payment);

        await this.prisma.payment.create({
            data
        });
    }

    // async createPixPayment(payment: PixPayment): Promise<void> {
    //     const data = PrismaPaymentMapper.toPrisma(payment);

    //     await this.prisma.payment.create({
    //         data
    //     });
    // }

    // async findByReservationId(reservationId: string): Promise<Payment | null> {
    //     const payment = await this.prisma.payment.findFirst({
    //         where: {
    //             reservationId
    //         }
    //     });

    //     if (!payment) {
    //         return null;
    //     }

    //     return PrismaPaymentMapper.toDomain(payment);
    // }
}