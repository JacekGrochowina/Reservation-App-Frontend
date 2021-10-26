import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { FooterComponent } from './components/footer/footer.component';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NavigationComponent,
    ToolbarComponent,
    PageWrapperComponent,
    FooterComponent,
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
  ],
  exports: [
    NavigationComponent,
    ToolbarComponent,
    PageWrapperComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
