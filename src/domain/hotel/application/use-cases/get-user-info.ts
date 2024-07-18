import { Either, left, right } from '@/core/either';
import { WrongCredentialsError } from '../errors/wrong-credentials-error';
import { Injectable } from '@nestjs/common';
import { Encrypter } from '../cryptography/encrypter';
import { UsersRepository } from '../repositories/users-repository';

interface GetUserInfoUseCaseRequest {
    userId: string;
}

export interface UserInfo {
    name: string;
    email: string;
    cpf: string;
    phone: string;
}

type GetUserInfoUseCaseResponse = Either<WrongCredentialsError, UserInfo>;

@Injectable()
export class GetUserInfoUseCase {
    constructor(
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