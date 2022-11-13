import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../../../../../../../../store/groups/interfaces/group.interface';

@Component({
  selector: 'app-group-details-info',
  templateUrl: './group-details-info.component.html',
  styleUrls: ['./group-details-info.component.scss']
})
export class GroupDetailsInfoComponent {

  @Input() groupDetailsItems$!: Observable<Group | null>;

}
