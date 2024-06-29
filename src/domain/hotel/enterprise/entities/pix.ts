import { AggregateRoot } from '@/core/entities/aggregate-root';

export interface PixProps {
    key: string;
    city: string;
}

export class Pix extends AggregateRoot<PixProps> {

    get key() {
        return this.props.key;
    }

    get city() {
        return this.props.city;
    }

    static create(props: PixProps) {
        return new Pix({ ...props });
    }
}