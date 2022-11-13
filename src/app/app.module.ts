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
import { appReducers } from './store/app.reducers';
import { AppState } from './store/app.state';
import { CarsFacade } from './store/cars/cars.facade';
import { CarsEffects } from './store/cars/cars.effects';
import { SettingsFacade } from './store/settings/settings.facade';
import { SettingsEffects } from './store/settings/settings.effects';
import { environment } from '../environments/environment';
import { StartComponent } from './modules/start/start.component';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthFacade } from './store/auth/auth.facade';
import { AuthInterceptorProvider } from './shared/utils/api/auth.interceptor';
import { GroupsFacade } from './store/groups/groups.facade';
import { GroupsEffects } from './store/groups/groups.effects';

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
    StoreModule.forRoot(appReducers as ActionReducerMap<AppState>),
    EffectsModule.forRoot([SettingsEffects, CarsEffects, AuthEffects, GroupsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [SettingsFacade, CarsFacade, AuthFacade, GroupsFacade, AuthInterceptorProvider, {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
