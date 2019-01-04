import {MarketsComponent} from './markets.component';
import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Subject} from 'rxjs';
import {MarketsListComponent} from '../../components/markets-list/markets-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngrx/store';


describe('MarketsComponent', () => {
  let component: MarketsComponent;
  let fixture: ComponentFixture<MarketsComponent>;
  const unsubscribe = new Subject<void>();

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [MarketsComponent, MarketsListComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    unsubscribe.next();
    unsubscribe.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
