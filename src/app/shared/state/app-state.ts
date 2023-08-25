import { Genesis } from '@shared/model/genesis';
import { Snes } from '@shared/model/snes';
import { Nullable } from '../model/nullable';

export interface AppState {
  [AppStateKeys.GENESIS]: {
    cache: Nullable<Genesis[]>;
    games: AppPayload<Genesis[]>;
  };
  [AppStateKeys.SNES]: {
    cache: Nullable<Snes[]>;
    games: AppPayload<Snes[]>;
  };
}

export enum AppStateKeys {
  GENESIS = 'genesis',
  SNES = 'snes',
}

export type AppPayload<T> = { data: Nullable<T>; loading: boolean; error: any };

export type AppSelector<T> = (state: object) => T;
