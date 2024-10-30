import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from '../repositories/payments-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { ReservationStatus } from '../../enterprise/entities/reservation';
import { ReservationsRepository } from '../repositories/reservations-repository';
import { PixPayment } from '../../enterprise/entities/pix-payment';

interface MakePaymentUseCaseRequest {
  userId: string;
  reservationAmounts: { [reservationId: string]: number; };
}

type MakePaymentUseCaseResponse = Either<ResourceNotFoundError, boolean>;

@Injectable()
export class MakePaymentUseCase {

  constructor(
    private paymentsRepository: PaymentsRepository,
    private reservationsRepository: ReservationsRepository
  ) { }

  async execute({ reservationAmounts, userId }: MakePaymentUseCaseRequest): Promise<MakePaymentUseCaseResponse> {

    for (const [reservationId, value] of Object.entries(reservationAmounts)) {
      const reservation = await this.reservationsRepository.findById(reservationId);

      if (!reservation) {
        return left(new ResourceNotFoundError());
      }

      const pix = PixPayment.create({
        reservationId,
        userId,
        value
      });

      await this.reservationsRepository.updateStatus(reservationId, ReservationStatus.CONFIRMED);
      await this.paymentsRepository.create(pix);
    }

    return right(true);
  }

}