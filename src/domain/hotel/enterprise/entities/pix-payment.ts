import { AggregateRoot } from '@/core/entities/aggregate-root';

export interface PixPaymentProps {
    value: number;
    userId: string;
    reservationId: string;
}

export class PixPayment extends AggregateRoot<PixPaymentProps> {

    get value() {
        return this.props.value;
    }

    get userId() {
        return this.props.userId;
    }

    get reservationId() {
        return this.props.reservationId;
    }

    static create(props: PixPaymentProps) {
        return new PixPayment({ ...props });
    }
}