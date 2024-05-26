import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitlebarComponent } from './components/titlebar/titlebar.component';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { LS_DATA_KEY } from './enviroments';
import { LOCAL_STORAGE_CACHE } from './services/data-service.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TitlebarComponent,
    TableComponent,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: LS_DATA_KEY, useValue: LOCAL_STORAGE_CACHE },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
