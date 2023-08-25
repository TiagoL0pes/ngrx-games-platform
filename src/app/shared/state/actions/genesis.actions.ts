import { createAction, props } from '@ngrx/store';
import { Genesis } from '@shared/model/genesis';
import { AppPayload } from '../app-state';

export enum GenesisActions {
  LOAD = '[Genesis API] Load games from API',
  ADD = '[Genesis API] Add new game',
  EDIT = '[Genesis API] Edit an existing game',
  DELETE = '[Genesis API] Delete game by id',
  SUCCESS = '[Genesis API] Games have been loaded successfully',
  FAIL = '[Genesis API] Fail to load games',
  SEARCH = '[Genesis] Search games by name',
  SORT = '[Genesis] Sort games',
}

export const loadGenesisGames = createAction(GenesisActions.LOAD);

export const successLoaded = createAction(
  GenesisActions.SUCCESS,
  props<{ payload: AppPayload<Genesis> }>()
);

export const addGenesisGame = createAction(
  GenesisActions.ADD,
  props<{ payload: Genesis }>()
);

export const editGenesisGame = createAction(
  GenesisActions.EDIT,
  props<{ payload: Genesis }>()
);

export const deleteGenesisGame = createAction(
  GenesisActions.DELETE,
  props<{ id: string }>()
);

export const failureLoad = createAction(
  GenesisActions.FAIL,
  props<{ payload: AppPayload<Genesis> }>()
);

export const searchGenesisGames = createAction(
  GenesisActions.SEARCH,
  props<{ text: string }>()
);

export const sortGenesisGames = createAction(
  GenesisActions.SORT,
  props<{ prop: string; direction: string }>()
);
