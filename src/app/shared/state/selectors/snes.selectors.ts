import { createSelector } from '@ngrx/store';
import { Genesis } from '@shared/model/genesis';
import { Snes } from '@shared/model/snes';
import { AppPayload, AppSelector, AppState, AppStateKeys } from '../app-state';

export const selectAllSnesGames = createSelector(
  (state: AppState) => state[AppStateKeys.SNES],
  (state) => state.games
) as AppSelector<AppPayload<Snes[]>>;
