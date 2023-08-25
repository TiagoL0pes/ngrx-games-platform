import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  addGenesisGame,
  loadGenesisGames,
  searchGenesisGames,
} from '@shared/state/actions/genesis.actions';
import {
  addSnesGame,
  loadSnesGames,
  searchSnesGames,
} from '@shared/state/actions/snes.actions';
import { selectAllSnesGames } from '@shared/state/selectors/snes.selectors';
import {
  combineLatestAll,
  debounceTime,
  filter,
  map,
  merge,
  Observable,
  tap,
} from 'rxjs';
import { GameDialogComponent } from './components/game-dialog/game-dialog.component';
import { Platform } from './shared/model/plaftom';
import { selectAllGenesisGames } from './shared/state/selectors/genesis.selectors';
import { Guid } from 'guid-typescript';
import { Snes } from '@shared/model/snes';
import { Genesis } from '@shared/model/genesis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private ignoreNext = false;
  games$!: Observable<any>;
  searchBar = new FormControl('');
  platforms: Platform[] = ['Genesis', 'Snes'];
  selectedPlatform: Platform = 'Genesis';
  searchGames: (props: any) => any = searchGenesisGames;
  addGame: (props: any) => any = addGenesisGame;

  constructor(private store: Store, public dialog: MatDialog) {
    this.games$ = merge([
      this.store.select(selectAllGenesisGames),
      this.store.select(selectAllSnesGames),
    ]).pipe(
      combineLatestAll(),
      tap((_) => (this.ignoreNext = false)),
      map(([genesis, snes]) =>
        this.selectedPlatform === 'Genesis' ? genesis : snes
      )
    );

    this.store.dispatch(loadGenesisGames());

    this.searchBar.valueChanges
      .pipe(
        filter((_) => !this.ignoreNext),
        map((text) => text?.trim() || ''),
        debounceTime(500)
      )
      .subscribe((text) => this.store.dispatch(this.searchGames({ text })));
  }

  onPlatformChange(platform: string) {
    this.clearSearchbar();

    if (platform === 'Genesis') {
      this.searchGames = searchGenesisGames;
      this.addGame = addGenesisGame;
      this.store.dispatch(loadGenesisGames());
    } else {
      this.searchGames = searchSnesGames;
      this.addGame = addSnesGame;
      this.store.dispatch(loadSnesGames());
    }
  }

  private clearSearchbar() {
    this.ignoreNext = true;
    this.searchBar.setValue('');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GameDialogComponent, {
      data: { name: '', downloads: 0, platform: this.selectedPlatform },
    });

    dialogRef.afterClosed().subscribe((result: Genesis | Snes) => {
      if (result) {
        this.store.dispatch(
          this.addGame({ payload: { ...result, id: Guid.create().toString() } })
        );
      }
    });
  }
}
