import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface UserProps {
    name: string;
    email: string;
    cpf: string
    phone: string;
    password: string;
}

export class User extends Entity<UserProps> {

    get name() {
        return this.props.name;
    }

    get email() {
        return this.props.email;
    }

    get cpf() {
        return this.props.cpf;
    }

    get phone() {
        return this.props.phone;
    }

    get password() {
        return this.props.password;
    }

    static create(props: UserProps, id?: UniqueEntityID) {
        return new User(props, id);
    }

}