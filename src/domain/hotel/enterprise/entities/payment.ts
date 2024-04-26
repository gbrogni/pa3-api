import { AggregateRoot } from '@/core/entities/aggregate-root';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PaymentPaidEvent } from '../events/payment-paid-event';

export interface PaymentProps {
    amount: number;
    paymentDate: Date;
    reservationId: UniqueEntityID;
}

export class Payment extends AggregateRoot<PaymentProps> {

    get amount() {
        return this.props.amount;
    }

    get paymentDate() {
        return this.props.paymentDate;
    }

    get reservationId() {
        return this.props.reservationId;
    }

    static create(props: PaymentProps) {
        const payment = new Payment({ ...props });

        payment.addDomainEvent(new PaymentPaidEvent(payment));

        return payment;
    }

}