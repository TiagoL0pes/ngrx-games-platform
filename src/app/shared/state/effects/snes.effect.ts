import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnesService } from '@shared/services/snes.service';
import { of, tap } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { SnesActions } from '../actions/snes.actions';

@Injectable()
export class SnesEffect {
  constructor(private actions$: Actions, private service: SnesService) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SnesActions.LOAD),
      exhaustMap(() =>
        this.service.getAll().pipe(
          map((data) => ({
            type: SnesActions.SUCCESS,
            payload: { data, error: null },
          }))
        )
      ),
      catchError((error) =>
        of({ type: SnesActions.FAIL, payload: { data: null, error } })
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SnesActions.ADD),
      exhaustMap((action: any) =>
        this.service
          .add(action.payload)
          .pipe(map(() => ({ type: SnesActions.LOAD })))
      ),
      catchError((error) =>
        of({ type: SnesActions.FAIL, payload: { data: null, error } })
      )
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SnesActions.EDIT),
      exhaustMap((action: any) =>
        this.service
          .edit(action.payload)
          .pipe(map(() => ({ type: SnesActions.LOAD })))
      ),
      catchError((error) =>
        of({ type: SnesActions.FAIL, payload: { data: null, error } })
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SnesActions.DELETE),
      tap((a) => console.log(a)),
      exhaustMap((action: any) =>
        this.service.delete(action.id).pipe(
          map((data) => ({
            type: SnesActions.LOAD,
            payload: { data, error: null },
          }))
        )
      ),
      catchError((error) =>
        of({ type: SnesActions.FAIL, payload: { data: null, error } })
      )
    )
  );
}
