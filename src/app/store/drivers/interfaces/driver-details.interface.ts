import { LoadingHandler } from 'src/app/shared/utils/interfaces/loading-handler.interface';
import { Driver } from './driver.interface';

export interface DriverDetailsState extends LoadingHandler {
  item: Driver | null;
}
