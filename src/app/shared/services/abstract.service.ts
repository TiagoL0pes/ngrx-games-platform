import { Injectable } from '@angular/core';
import { normalizeStr } from '@shared/commons/strings';
import { Genesis } from '@shared/model/genesis';
import { Snes } from '@shared/model/snes';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractService {
  filterGamesByName(games: Genesis[] | Snes[], text: string) {
    return games.filter((game) => {
      const normalizedText = normalizeStr(text).trim();
      const normalizedName = normalizeStr(game.name).trim();
      return normalizedName.match(new RegExp(`(\\w+)?${normalizedText}`, 'gi'));
    });
  }
}
