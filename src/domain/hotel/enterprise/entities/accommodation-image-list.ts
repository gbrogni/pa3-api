import { WatchedList } from '@/core/entities/watched-list';
import { AccommodationImage } from './accommodation-image';

export class AccommodationImageList extends WatchedList<AccommodationImage> {

  public compareItems(a: AccommodationImage, b: AccommodationImage): boolean {
    return a.imageId.equals(b.imageId);
  }

}