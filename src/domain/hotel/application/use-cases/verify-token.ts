import { Injectable } from '@nestjs/common';
import { Encrypter } from '../cryptography/encrypter';
import { Either, left, right } from '@/core/either';
import { WrongCredentialsError } from '../errors/wrong-credentials-error';

interface VerifyTokenUseCaseRequest {
    token: string;
}

type VerifyTokenUseCaseResponse = Either<WrongCredentialsError, boolean>;

@Injectable()
export class VerifyTokenUseCase {

    constructor(
        private encrypter: Encrypter,
    ) { }

    async execute({token}: VerifyTokenUseCaseRequest): Promise<VerifyTokenUseCaseResponse> {
        try {
            await this.encrypter.decrypt(token);
            return right(true);
        } catch (error) {
            return left(new WrongCredentialsError());
        }
    }

}