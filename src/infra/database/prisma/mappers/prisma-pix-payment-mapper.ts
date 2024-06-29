import { PixPayment } from '@/domain/hotel/enterprise/entities/pix-payment';
import { Payment as PrismaPayment, Prisma } from '@prisma/client';

export class PrismaPixPaymentMapper {

    static toDomain(payment: PrismaPayment): PixPayment {
        return PixPayment.create({
            value: payment.value,
            userId: payment.userId,
            reservationId: payment.reservationId
        });
    }

    static toPrisma(payment: PixPayment): Prisma.PaymentUncheckedCreateInput {
        return {
            value: payment.value,
            userId: payment.userId,
            reservationId: payment.reservationId
        };
    }

}