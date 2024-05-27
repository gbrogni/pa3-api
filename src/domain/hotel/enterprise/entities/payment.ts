import { AggregateRoot } from '@/core/entities/aggregate-root';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PaymentPaidEvent } from '../events/payment-paid-event';

export enum PaymentMethod {
    CARD = 'CARD',
    PAYPAL = 'PAYPAL',
    APPLE = 'APPLE',
}

export interface PaymentProps {
    amount: number;
    paymentDate: Date;
    reservationId: UniqueEntityID;
    paymentMethod: PaymentMethod;
    cardNumber: string;
    cardName: string;
    expiryDate: Date;
    cvc: string;
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

    get paymentMethod() {
        return this.props.paymentMethod;
    }

    get cardNumber() {
        return this.props.cardNumber;
    }

    get cardName() {
        return this.props.cardName;
    }

    get expiryDate() {
        return this.props.expiryDate;
    }

    get cvv() {
        return this.props.cvc;
    }

    static create(props: PaymentProps) {
        return new Payment({ ...props });
    }

    static getPaymentMethod(value: string): PaymentMethod {
        switch (value) {
            case 'CARD':
                return PaymentMethod.CARD;
            case 'PAYPAL':
                return PaymentMethod.PAYPAL;
            case 'APPLE':
                return PaymentMethod.APPLE;
            default:
                throw new Error(`Invalid payment method: ${value}`);
        }
    }

}