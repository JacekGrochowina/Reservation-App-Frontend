import { LoadingHandler } from 'src/app/shared/utils/interfaces/loading-handler.interface';
import { Car } from './car.interface';

export interface CarDetailsState extends LoadingHandler {
  item: Car | null;
}
