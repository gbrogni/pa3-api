import { CreateUserUseCase } from '@/domain/hotel/application/use-cases/create-user';
import { Public } from '@/infra/auth/public';
import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { UserAlreadyExistsError } from '@/domain/hotel/application/errors/user-already-exists-error';

const createAccountBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
@Public()
export class CreateAccountController {

    constructor(
        private createUser: CreateUserUseCase
    ) { }

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: CreateAccountBodySchema) {
        const { name, phone, email, password } = body

        const result = await this.createUser.execute({
            name,
            phone,
            email,
            password,
        });

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case UserAlreadyExistsError:
                    throw new ConflictException(error.message);
                default:
                    throw new BadRequestException(error.message);
            }
        }

    }

}