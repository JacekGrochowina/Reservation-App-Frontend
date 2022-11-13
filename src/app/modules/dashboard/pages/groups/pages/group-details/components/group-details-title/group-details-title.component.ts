import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../../../../../../../../store/groups/interfaces/group.interface';

@Component({
  selector: 'app-group-details-title',
  templateUrl: './group-details-title.component.html',
  styleUrls: ['./group-details-title.component.scss']
})
export class GroupDetailsTitleComponent {

  @Input() groupDetailsItems$!: Observable<Group | null>;

}
