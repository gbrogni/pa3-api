import { DomainEvent } from '@/core/events/domain-event';
import { Payment } from '../entities/payment';

export class PaymentPaidEvent implements DomainEvent {

    public ocurredAt: Date;
    public payment: Payment;

    constructor(payment: Payment) {
        this.ocurredAt = new Date();
        this.payment = payment;
    }

    public getAggregateId() {
        return this.payment.id;
    }
    
}