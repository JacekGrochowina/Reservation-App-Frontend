import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../../../../../store/cars/interfaces/car.interface';

@Component({
  selector: 'app-car-details-info',
  templateUrl: './car-details-info.component.html',
  styleUrls: ['./car-details-info.component.scss']
})
export class CarDetailsInfoComponent {

  @Input() carDetailsItems$!: Observable<Car | null>;

}
