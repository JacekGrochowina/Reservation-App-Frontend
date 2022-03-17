import { LoadingHandler } from 'src/app/shared/utils/interfaces/loading-handler.interface';
import { Driver } from './driver.interface';

export interface DriversListState extends LoadingHandler {
  items: Driver[];
}
