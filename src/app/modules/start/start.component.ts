import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthFacade } from '../../store/auth/auth.facade';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Routing } from '../../shared/utils/enums/routing.enum';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit, OnDestroy {

  private externalUrl = 'http://jacekcv.com';
  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  public ngOnInit(): void {
    // this.goToExternalUrl();
    this.authFacade.authIsLogged$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((authIsLogged) => {
        authIsLogged
          ? this.router.navigate([Routing.dashboard])
          : this.router.navigate([Routing.login]);
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  private goToExternalUrl(): void {
    this.document.location.href = this.externalUrl;
  }

}
