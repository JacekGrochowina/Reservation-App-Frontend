import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {

  private externalUrl = 'http://jacekcv.com';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public ngOnInit(): void {
    // this.goToExternalUrl();
  }

  private goToExternalUrl(): void {
    this.document.location.href = this.externalUrl;
  }

}
