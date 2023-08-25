import { createReducer, on } from '@ngrx/store';
import { Genesis } from '@shared/model/genesis';
import { normalizeStr } from '../../commons/strings';
import { Nullable } from '../../model/nullable';
import {
  failureLoad,
  loadGenesisGames,
  searchGenesisGames,
  sortGenesisGames,
  successLoaded,
} from '../actions/genesis.actions';
import { AppPayload } from '../app-state';

type State = {
  cache: Nullable<Genesis[]>;
  games: AppPayload<Genesis[]>;
};

export const initialState: State = {
  cache: null,
  games: {
    data: null,
    loading: false,
    error: null,
  },
};

export const genesisReducer = createReducer(
  initialState,
  on(loadGenesisGames, (state) => ({
    ...state,
    games: { ...state.games, loading: true },
  })),
  on(successLoaded, failureLoad, (state, props: any) => {
    const { data, error } = props.payload;

    return {
      ...state,
      cache: data,
      games: {
        data,
        error,
        loading: false,
      },
    };
  }),
  on(searchGenesisGames, (state, props: any) => {
    const { text } = props;
    let data: Genesis[];

    if (text.trim() === '') {
      data = [...(state.cache as Genesis[])];
    } else {
      data = state.cache?.filter((game) => {
        const normalizedText = normalizeStr(text).trim();
        const normalizedName = normalizeStr(game.name).trim();
        return normalizedName.match(
          new RegExp(`(\\w+)?${normalizedText}`, 'gi')
        );
      }) as Genesis[];
    }

    return {
      ...state,
      games: { ...state.games, data },
    };
  }),
  on(sortGenesisGames, (state, props: any) => {
    const { prop, direction } = props;

    const isAsc = direction === 'asc';
    const compare = (a: number | string, b: number | string, isAsc: boolean) =>
      (a < b ? -1 : 1) * (isAsc ? 1 : -1);

    const data = [...(state.games.data as Genesis[])]?.sort(
      (el1: any, el2: any) => compare(el1[prop], el2[prop], isAsc)
    );

    return {
      ...state,
      games: { ...state.games, data },
    };
  })
);
