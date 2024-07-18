import { WrongCredentialsError } from '@/domain/hotel/application/errors/wrong-credentials-error';
import { GetUserInfoUseCase } from '@/domain/hotel/application/use-cases/get-user-info';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { BadRequestException, Controller, Get, UnauthorizedException } from '@nestjs/common';

@Controller('/me')
export class GetUserInfoController {
    constructor(
        private readonly usersService: GetUserInfoUseCase
    ) {}

    @Get()
    async handle(@CurrentUser() user: UserPayload) {
        const userId = user.sub;
        const result = await this.usersService.execute({userId});

        if (result.isLeft()) {
            const error = result.value;

    
            switch (error.constructor) {
                case WrongCredentialsError:
                    throw new UnauthorizedException(error.message);
                default:
                    throw new BadRequestException(error.message);
            }
        }

        return result.value;
    }
}