import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameModel } from '@shared/model/game-model';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss'],
})
export class GameDialogComponent {
  isSnes: boolean;
  buttonLabel!: string;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameModel,
    private fb: FormBuilder
  ) {
    this.isSnes = data.platform === 'Snes';
    this.buttonLabel = data.name ? 'Edit game' : 'Add game';

    this.form = this.fb.group({
      name: new FormControl(data?.name || '', {
        validators: [Validators.required],
      }),
      genre: new FormControl(data?.genre || ''),
      downloads: new FormControl(data?.downloads || 0),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
