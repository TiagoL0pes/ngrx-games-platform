import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatOption } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState as genesisState } from '@shared/state/reducers/genesis.reducers';
import { initialState as snesState } from '@shared/state/reducers/snes.reducers';
import { selectAllGenesisGames } from '@shared/state/selectors/genesis.selectors';
import { selectAllSnesGames } from '@shared/state/selectors/snes.selectors';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

const initialState = {
  genesis: genesisState,
  snes: snesState,
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [AppModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectAllGenesisGames as any, value: genesisState },
            { selector: selectAllSnesGames as any, value: snesState },
          ],
        }),
      ],
    });

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  fit('should change to snes games', () => {
    spyOn(component, 'onPlatformChange');

    const selectElement = fixture.debugElement.query(By.css('mat-select'))
      .nativeElement as HTMLSelectElement;
    selectElement.click();
    fixture.detectChanges();

    const optionElement = fixture.debugElement.queryAll(
      By.directive(MatOption)
    )[1].nativeElement;
    optionElement.click();
    fixture.detectChanges();

    expect(component.onPlatformChange).toHaveBeenCalled();
    expect(component.selectedPlatform).toEqual('Snes');
  });
});
