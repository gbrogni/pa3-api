// import { UniqueEntityID } from '@/core/entities/unique-entity-id';
// import { Payment, PaymentMethod } from '@/domain/hotel/enterprise/entities/payment';
// import { PixPayment } from '@/domain/hotel/enterprise/entities/pix-payment';
// import { Payment as PrismaPayment, Prisma, $Enums } from '@prisma/client';

// export class PrismaPaymentMapper {

//     static toDomain(payment: PrismaPayment): Payment {
//         return Payment.create({
//             amount: payment.amount,
//             reservationId: new UniqueEntityID(payment.reservationId),
//             paymentDate: payment.paymentDate,
//             paymentMethod: PrismaPaymentMapper.mapPaymentMethod(payment.paymentMethod),
//             cardNumber: payment.cardNumber !== null ? payment.cardNumber : '',
//             cardName: payment.cardName ?? '',
//             expiryDate: payment.expiryDate ?? new Date(),
//             cvc: payment.cvc !== null ? payment.cvc : ''
//         });
//     }

//     static toPrisma(payment: PixPayment): Prisma.PaymentUncheckedCreateInput {
//         return {
//             amount: payment.value,
//             reservationId: payment.reservationId.toString(),
//         };
//     }

//     private static mapPaymentMethod(paymentMethod: $Enums.PaymentMethod): PaymentMethod {
//         switch (paymentMethod) {
//             case 'CARD':
//                 return PaymentMethod.CARD;
//             case 'PAYPAL':
//                 return PaymentMethod.PAYPAL;
//             case 'APPLE':
//                 return PaymentMethod.APPLE;
//             default:
//                 throw new Error(`Invalid payment method: ${paymentMethod}`);
//         }
//     }

// }