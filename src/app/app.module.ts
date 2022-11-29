import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatSidenavModule } from '@angular/material/sidenav';
import { appReducers, metaReducers } from './store/app.reducers';
import { AppState } from './store/app.state';
import { SettingsFacade } from './store/settings/settings.facade';
import { SettingsEffects } from './store/settings/settings.effects';
import { environment } from '../environments/environment';
import { StartComponent } from './modules/start/start.component';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthFacade } from './store/auth/auth.facade';
import { AuthInterceptorProvider } from './shared/utils/api/auth.interceptor';
import { GroupsFacade } from './store/groups/groups.facade';
import { GroupsEffects } from './store/groups/groups.effects';
import { ItemsFacade } from './store/items/items.facade';
import { ItemsEffects } from './store/items/items.effects';
import { ReservationsEffects } from './store/reservations/reservations.effects';
import { ReservationsFacade } from './store/reservations/reservations.facade';
import { DictionariesFacade } from './store/dictionaries/dictionaries.facade';
import { DictionariesEffects } from './store/dictionaries/dictionaries.effects';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      appReducers as ActionReducerMap<AppState>,
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        }
      }),
    EffectsModule.forRoot([
      SettingsEffects,
      AuthEffects,
      DictionariesEffects,
      GroupsEffects,
      ItemsEffects,
      ReservationsEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    SettingsFacade,
    AuthFacade,
    DictionariesFacade,
    GroupsFacade,
    ItemsFacade,
    ReservationsFacade,
    AuthInterceptorProvider,
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
