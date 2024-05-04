import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Payment } from '@/domain/hotel/enterprise/entities/payment';
import { Payment as PrismaPayment, Prisma } from '@prisma/client';

export class PrismaPaymentMapper {

    static toDomain(payment: PrismaPayment): Payment {
        return Payment.create({
            amount: payment.amount,
            reservationId: new UniqueEntityID(payment.reservationId),
            paymentDate: payment.paymentDate
        });
    }

    static toPrisma(payment: Payment): Prisma.PaymentUncheckedCreateInput {
        return {
            amount: payment.amount,
            reservationId: payment.reservationId.toString(),
            paymentDate: payment.paymentDate
        }
    }

}