import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GenesisEffect } from '@shared/state/effects/genesis.effect';
import { SnesEffect } from '@shared/state/effects/snes.effect';
import { genesisReducer } from '@shared/state/reducers/genesis.reducers';
import { snesReducer } from '@shared/state/reducers/snes.reducers';
import { AppComponent } from './app.component';
import { extModules } from './build-specifics';
import { GameDialogModule } from './components/game-dialog/game-dialog.module';
import { TableModule } from './components/table/table.module';
import { AppStateKeys } from './shared/state/app-state';

const MaterialModules = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatOptionModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      [AppStateKeys.GENESIS]: genesisReducer,
      [AppStateKeys.SNES]: snesReducer,
    }),
    extModules,
    EffectsModule.forRoot([GenesisEffect, SnesEffect]),
    ...MaterialModules,
    TableModule,
    GameDialogModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
