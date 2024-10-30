import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { GenerateQRCodePixUseCase } from '@/domain/hotel/application/use-cases/make-pix';

const generatePixBodySchema = z.object({
  reservationIds: z.array(z.string()),
  value: z.number(),
});

const bodyValidationPipe = new ZodValidationPipe(generatePixBodySchema);

type GeneratePixBodySchema = z.infer<typeof generatePixBodySchema>;

@Controller('/reservations/pix')
export class GeneratePixController {

  constructor(
    private pix: GenerateQRCodePixUseCase
  ) { }

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: GeneratePixBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub;
    const { value } = body;

    const result = await this.pix.execute({
      value,
      name: userId,
      key: '13072038929'
    });

    return result;
  }

}