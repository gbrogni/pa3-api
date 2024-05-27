import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Payment, PaymentMethod } from '@/domain/hotel/enterprise/entities/payment';
import { Payment as PrismaPayment, Prisma, $Enums } from '@prisma/client';

export class PrismaPaymentMapper {

    static toDomain(payment: PrismaPayment): Payment {
        return Payment.create({
            amount: payment.amount,
            reservationId: new UniqueEntityID(payment.reservationId),
            paymentDate: payment.paymentDate,
            paymentMethod: PrismaPaymentMapper.mapPaymentMethod(payment.paymentMethod),
            cardNumber: payment.cardNumber !== null ? payment.cardNumber : '',
            cardName: payment.cardName ?? '', // Fix: Handle null value by using nullish coalescing operator
            expiryDate: payment.expiryDate ?? new Date(), // Fix: Handle null value by using nullish coalescing operator and provide a default value
            cvc: payment.cvc !== null ? payment.cvc : ''
        });
    }

    static toPrisma(payment: Payment): Prisma.PaymentUncheckedCreateInput {
        return {
            amount: payment.amount,
            reservationId: payment.reservationId.toString(),
            paymentDate: payment.paymentDate,
            paymentMethod: payment.paymentMethod,
            cardNumber: payment.cardNumber,
            cardName: payment.cardName,
            expiryDate: payment.expiryDate, // Convert Date to string
            cvc: payment.cvv
        };
    }

    private static mapPaymentMethod(paymentMethod: $Enums.PaymentMethod): PaymentMethod {
        switch (paymentMethod) {
            case 'CARD':
                return PaymentMethod.CARD;
            case 'PAYPAL':
                return PaymentMethod.PAYPAL;
            case 'APPLE':
                return PaymentMethod.APPLE;
            default:
                throw new Error(`Invalid payment method: ${paymentMethod}`);
        }
    }

}