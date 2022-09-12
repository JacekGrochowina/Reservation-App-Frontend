import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Car } from '../../../../../../store/cars/interfaces/car.interface';

@Component({
  selector: 'app-car-details-title',
  templateUrl: './car-details-title.component.html',
  styleUrls: ['./car-details-title.component.scss']
})
export class CarDetailsTitleComponent {

  @Input() carDetailsItems$!: Observable<Car | null>;

  constructor(private router: Router) {}

  public backToList(): void {
    this.router.navigate(['../../']);
  }

}
