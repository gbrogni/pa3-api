import { PixPayment } from '../../enterprise/entities/pix-payment';

export abstract class PaymentsRepository {
    abstract create(payment: PixPayment): Promise<void>;
    // abstract findByReservationId(reservationId: string): Promise<Payment | null>;
}