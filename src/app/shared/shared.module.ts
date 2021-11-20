// Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { FooterComponent } from './components/footer/footer.component';
import { FluidLoadingComponent } from './components/fluid-loading/fluid-loading.component';
import { TableLoadingComponent } from './components/table-loading/table-loading.component';

// Material Modules
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NavigationComponent,
    ToolbarComponent,
    PageWrapperComponent,
    FooterComponent,
    FluidLoadingComponent,
    TableLoadingComponent,
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
  ],
  exports: [
    MatProgressSpinnerModule,
    NavigationComponent,
    ToolbarComponent,
    PageWrapperComponent,
    FooterComponent,
    FluidLoadingComponent,
    TableLoadingComponent,
  ],
})
export class SharedModule {}
