import { WatchedList } from '@/core/entities/watched-list';
import { Reservation } from './reservation';

export class ReservationList extends WatchedList<Reservation> {

  public compareItems(a: Reservation, b: Reservation): boolean {
    return a.id.equals(b.id);
  }

}