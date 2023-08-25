import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDialogComponent } from './game-dialog.component';

describe('GameDialogComponent', () => {
  let component: GameDialogComponent;
  let fixture: ComponentFixture<GameDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameDialogComponent]
    });
    fixture = TestBed.createComponent(GameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
