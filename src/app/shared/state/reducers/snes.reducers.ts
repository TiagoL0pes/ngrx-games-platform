import { createReducer, on } from '@ngrx/store';
import { Snes } from '@shared/model/snes';
import { normalizeStr } from '../../commons/strings';
import { Nullable } from '../../model/nullable';
import {
  failureLoad,
  loadSnesGames,
  searchSnesGames,
  sortSnesGames,
  successLoaded,
} from '../actions/snes.actions';
import { AppPayload } from '../app-state';

type State = {
  cache: Nullable<Snes[]>;
  games: AppPayload<Snes[]>;
};

export const initialState: State = {
  cache: null,
  games: {
    data: null,
    loading: false,
    error: null,
  },
};

export const snesReducer = createReducer(
  initialState,
  on(loadSnesGames, (state) => ({
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
  on(searchSnesGames, (state, props: any) => {
    const { text } = props;
    let data: Snes[];

    if (text.trim() === '') {
      data = [...(state.cache as Snes[])];
    } else {
      data = state.cache?.filter((game) => {
        const normalizedText = normalizeStr(text).trim();
        const normalizedName = normalizeStr(game.name).trim();
        return normalizedName.match(
          new RegExp(`(\\w+)?${normalizedText}`, 'gi')
        );
      }) as Snes[];
    }

    return {
      ...state,
      games: { ...state.games, data },
    };
  }),
  on(sortSnesGames, (state, props: any) => {
    const { prop, direction } = props;

    const isAsc = direction === 'asc';
    const compare = (a: number | string, b: number | string, isAsc: boolean) =>
      (a < b ? -1 : 1) * (isAsc ? 1 : -1);

    const data = [...(state.games.data as Snes[])]?.sort((el1: any, el2: any) =>
      compare(el1[prop], el2[prop], isAsc)
    );

    return {
      ...state,
      games: { ...state.games, data },
    };
  })
);
