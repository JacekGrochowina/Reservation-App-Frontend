import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { Car } from './car.interface';

export interface CarDetailsState extends Loading {
  item: Car | null;
}
