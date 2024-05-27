import { Either, left, right } from '@/core/either';
import { WrongCredentialsError } from '../errors/wrong-credentials-error';
import { Injectable } from '@nestjs/common';
import { Encrypter } from '../cryptography/encrypter';
import { UsersRepository } from '../repositories/users-repository';
import { User } from '../../enterprise/entities/user';

interface GetUserInfoUseCaseRequest {
    userId: string;
}

// Define a new type that includes the properties of the user that you want to return
export interface UserInfo {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    // Add any other properties that you want to return
}

type GetUserInfoUseCaseResponse = Either<WrongCredentialsError, UserInfo>;

@Injectable()
export class GetUserInfoUseCase {
    constructor(
        private encrypter: Encrypter,
        private usersRepository: UsersRepository,
    ) { }

    async execute({userId}: GetUserInfoUseCaseRequest): Promise<GetUserInfoUseCaseResponse> {
        try {
            const user = await this.usersRepository.findById(userId);
            if (!user) {
                return left(new WrongCredentialsError());
            }
            const { id, password, ...userWithoutIdAndPassword } = user;
            const info: UserInfo = {
                cpf: user.cpf,
                email: user.email,
                name: user.name,
                phone: user.phone,
            }
            return right(info);
        } catch (error) {
            return left(new WrongCredentialsError());
        }
    }
}