import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Genesis } from '@shared/model/genesis';
import { Snes } from '@shared/model/snes';
import {
  deleteGenesisGame,
  editGenesisGame,
  sortGenesisGames,
} from '@shared/state/actions/genesis.actions';
import {
  deleteSnesGame,
  editSnesGame,
  sortSnesGames,
} from '@shared/state/actions/snes.actions';
import { AppPayload } from '@shared/state/app-state';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';
import { Platform } from './../../shared/model/plaftom';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges, AfterViewInit {
  @Input() vm!: AppPayload<Genesis[] | Snes[]>;
  @Input() platform!: Platform;
  headers!: string[];
  dataSource = new MatTableDataSource([]);
  sortGames!: (props?: any) => any;
  editGame!: (props?: any) => any;
  deleteGame!: (props?: any) => any;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vm']?.currentValue) {
      this.dataSource = new MatTableDataSource(changes['vm'].currentValue.data);
    }

    if (changes['platform']?.currentValue) {
      if (changes['platform'].currentValue === 'Genesis') {
        this.headers = ['name', 'downloads', 'actions'];
        this.sortGames = sortGenesisGames;
        this.editGame = editGenesisGame;
        this.deleteGame = deleteGenesisGame;
      } else {
        this.headers = ['name', 'genre', 'downloads', 'actions'];
        this.sortGames = sortSnesGames;
        this.editGame = editSnesGame;
        this.deleteGame = deleteSnesGame;
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  isSnes() {
    return this.platform === 'Snes';
  }

  announceSortChange(sortState: Sort) {
    this.store.dispatch(
      this.sortGames({ prop: sortState.active, direction: sortState.direction })
    );

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openGameDialog({ id, name, genre, downloads }: any): void {
    const dialogRef = this.dialog.open(GameDialogComponent, {
      data: { name, downloads, genre, platform: this.platform },
    });

    dialogRef.afterClosed().subscribe((result: Genesis | Snes) => {
      if (result) {
        this.store.dispatch(this.editGame({ payload: { ...result, id } }));
      }
    });
  }

  openConfirmationDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(this.deleteGame({ id }));
      }
    });
  }
}
