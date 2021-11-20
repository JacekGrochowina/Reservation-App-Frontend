import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fluid-loading',
  templateUrl: './fluid-loading.component.html',
  styleUrls: ['./fluid-loading.component.scss'],
})
export class FluidLoadingComponent implements OnInit {
  @Input() height!: number;

  constructor() {}

  ngOnInit(): void {}
}
