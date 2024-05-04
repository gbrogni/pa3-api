import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaymentsRepository } from '@/domain/hotel/application/repositories/payments-repository';
import { Payment } from '@/domain/hotel/enterprise/entities/payment';
import { PrismaPaymentMapper } from '../mappers/prisma-payment-mapper';

@Injectable()
export class PrismaPaymentsRepository implements PaymentsRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async create(payment: Payment): Promise<void> {
        const data = PrismaPaymentMapper.toPrisma(payment);

        await this.prisma.payment.create({
            data
        });
    }

    async findByReservationId(reservationId: string): Promise<Payment | null> {
        const payment = await this.prisma.payment.findFirst({
            where: {
                reservationId
            }
        });

        if (!payment) {
            return null;
        }

        return PrismaPaymentMapper.toDomain(payment);
    }
}