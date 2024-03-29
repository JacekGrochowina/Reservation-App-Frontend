import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FluidLoadingComponent } from './components/fluid-loading/fluid-loading.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainTemplateComponent } from './templates/main-template/main-template.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TableComponent } from './components/table/table.component';
import { TableLoadingComponent } from './components/table/table-loading/table-loading.component';
import { TableContentComponent } from './components/table/table-content/table-content.component';
import { TableErrorComponent } from './components/table/table-error/table-error.component';
import { TableEmptyComponent } from './components/table/table-empty/table-empty.component';
import { PageContentTemplateComponent } from './templates/page-content-template/page-content-template.component';
import { PageContainerTemplateComponent } from './templates/page-container-template/page-container-template.component';
import { ButtonLoadingComponent } from './components/button-loading/button-loading.component';
import { DialogService } from './services/dialog.service';
import { BaseSnackbarComponent } from './components/snackbars/base/base-snackbar.component';
import { FailSnackbarComponent } from './components/snackbars/fail/fail-snackbar.component';
import { InfoSnackbarComponent } from './components/snackbars/info/info-snackbar.component';
import { SuccessSnackbarComponent } from './components/snackbars/success/success-snackbar.component';
import { WarningSnackbarComponent } from './components/snackbars/warning/warning-snackbar.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';
import { MatMenuModule } from '@angular/material/menu';
import { CurrentUserInfoComponent } from './components/sidenav/current-user-info/current-user-info.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ToolbarComponent,
    FooterComponent,
    ErrorHandlerComponent,
    FluidLoadingComponent,
    MainTemplateComponent,
    SidenavComponent,
    CurrentUserInfoComponent,
    TableComponent,
    TableLoadingComponent,
    TableContentComponent,
    TableErrorComponent,
    TableEmptyComponent,
    PageContentTemplateComponent,
    PageContainerTemplateComponent,
    ButtonLoadingComponent,
    AuthWrapperComponent,
    BaseSnackbarComponent,
    FailSnackbarComponent,
    InfoSnackbarComponent,
    SuccessSnackbarComponent,
    WarningSnackbarComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatMenuModule,
        MatExpansionModule,
    ],
  exports: [
    MatProgressSpinnerModule,
    ToolbarComponent,
    FooterComponent,
    ErrorHandlerComponent,
    FluidLoadingComponent,
    MainTemplateComponent,
    SidenavComponent,
    TableComponent,
    PageContentTemplateComponent,
    PageContainerTemplateComponent,
    ButtonLoadingComponent,
    AuthWrapperComponent,
    TableEmptyComponent,
  ],
  providers: [
    DialogService,
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
  ],
})
export class SharedModule {
}
