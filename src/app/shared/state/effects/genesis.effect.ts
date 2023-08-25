import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GenesisService } from '@shared/services/genesis.service';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { GenesisActions } from '../actions/genesis.actions';

@Injectable()
export class GenesisEffect {
  constructor(private actions$: Actions, private service: GenesisService) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenesisActions.LOAD),
      exhaustMap(() =>
        this.service.getAll().pipe(
          map((data) => ({
            type: GenesisActions.SUCCESS,
            payload: { data, error: null },
          }))
        )
      ),
      catchError((error) =>
        of({ type: GenesisActions.FAIL, payload: { data: null, error } })
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenesisActions.ADD),
      exhaustMap((action: any) =>
        this.service
          .add(action.payload)
          .pipe(map(() => ({ type: GenesisActions.LOAD })))
      ),
      catchError((error) =>
        of({ type: GenesisActions.FAIL, payload: { data: null, error } })
      )
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenesisActions.EDIT),
      exhaustMap((action: any) =>
        this.service
          .edit(action.payload)
          .pipe(map(() => ({ type: GenesisActions.LOAD })))
      ),
      catchError((error) =>
        of({ type: GenesisActions.FAIL, payload: { data: null, error } })
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenesisActions.DELETE),
      exhaustMap((action: any) =>
        this.service.delete(action.id).pipe(
          map((data) => ({
            type: GenesisActions.LOAD,
            payload: { data, error: null },
          }))
        )
      ),
      catchError((error) =>
        of({ type: GenesisActions.FAIL, payload: { data: null, error } })
      )
    )
  );
}
