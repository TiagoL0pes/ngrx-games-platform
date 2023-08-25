import { createSelector } from '@ngrx/store';
import { Genesis } from '@shared/model/genesis';
import { AppPayload, AppSelector, AppState, AppStateKeys } from '../app-state';

export const selectAllGenesisGames = createSelector(
  (state: AppState) => state[AppStateKeys.GENESIS],
  (state) => state.games
) as AppSelector<AppPayload<Genesis[]>>;
