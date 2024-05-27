import { VerifyTokenUseCase } from '@/domain/hotel/application/use-cases/verify-token';
import { Public } from '@/infra/auth/public';
import { Controller, Headers, Post, BadRequestException, UnauthorizedException } from '@nestjs/common';

@Controller('/verify-token')
@Public()
export class VerifyTokenController {

    constructor(
        private verifyToken: VerifyTokenUseCase
    ) { }

    @Post()
    async handle(@Headers('authorization') token: string) {
        if (!token.startsWith('Bearer ')) {
            throw new BadRequestException('Invalid authorization header');
        }

        token = token.slice(7);

        const result = await this.verifyToken.execute({ token });

        if (result.isLeft()) {
            throw new UnauthorizedException(result.value.toString());
        }

        return {
            isValid: result.isRight(),
        };
    }
}