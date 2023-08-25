import { createAction, props } from '@ngrx/store';
import { Snes } from '@shared/model/snes';
import { AppPayload } from '../app-state';

export enum SnesActions {
  LOAD = '[Snes API] Load games from API',
  ADD = '[Snes API] Add new game',
  EDIT = '[Snes API] Edit an existing game',
  DELETE = '[Snes API] Delete game by id',
  SUCCESS = '[Snes API] Games have been loaded successfully',
  FAIL = '[Snes API] Fail to load games',
  SEARCH = '[Snes] Search games by name',
  SORT = '[Snes] Sort games',
}

export const loadSnesGames = createAction(SnesActions.LOAD);

export const successLoaded = createAction(
  SnesActions.SUCCESS,
  props<{ payload: AppPayload<Snes> }>()
);

export const addSnesGame = createAction(
  SnesActions.ADD,
  props<{ payload: Snes }>()
);

export const editSnesGame = createAction(
  SnesActions.EDIT,
  props<{ payload: Snes }>()
);

export const deleteSnesGame = createAction(
  SnesActions.DELETE,
  props<{ id: string }>()
);

export const failureLoad = createAction(
  SnesActions.FAIL,
  props<{ payload: AppPayload<Snes> }>()
);

export const searchSnesGames = createAction(
  SnesActions.SEARCH,
  props<{ text: string }>()
);

export const sortSnesGames = createAction(
  SnesActions.SORT,
  props<{ prop: string; direction: string }>()
);
