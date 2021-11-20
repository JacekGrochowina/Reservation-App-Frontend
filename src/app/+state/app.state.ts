/* App State
 *
 * How to use?
 *  1. import states of the modules in this file
 *  2. do it like in example below
 *
 */

import { DriversState } from '../modules/drivers/+state/drivers.state';
// import { RoutesState } from '../modules/routes/+state/routes.state';
// import { VehiclesState } from '../modules/vehicles/+state/vehicles.state';

export interface AppState {
  drivers: DriversState;
  //   vehicles: VehiclesState;
  //   routes: RoutesState;
}
