import {MarketsComponent} from './markets.component';
import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import {Subject} from 'rxjs';
import {MarketsListComponent} from '../../components/markets-list/markets-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule, Store, combineReducers} from '@ngrx/store';
import {LoadMarkets, LoadMarketsCategories, MarketPurchase} from '../../actions/markets.actions';
import {generateMarkets} from '../../models/market';
import {last} from 'rxjs/internal/operators';
import {id} from '../../../shared/utils/id';
import {Portfolio} from '../../../shared/models/portfolio';


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
            pipe: jest.fn(() => hot('-a', {a: 20}))
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



  describe('ngOnInit', () => {
    it('should dispatch LoadMarkets action in ngOnInit lifecycle', () => {
      const action = new LoadMarkets();
      const store = TestBed.get(Store);
      const spy = jest.spyOn(store, 'dispatch');

      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(action);
    });

    it('should dispatch LoadMarketsCategories action in ngOnInit lifecycle', () => {
      const action = new LoadMarketsCategories();
      const store = TestBed.get(Store);
      const spy = jest.spyOn(store, 'dispatch');

      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(action);
    });

    it('should getUserBalance', () => {
      const store = TestBed.get(Store);
      const balance = Math.floor(Math.random() * (5000));
      store.pipe = jest.fn(() => hot('-a', {a: balance}));

      fixture.detectChanges();

      const expected = cold('-a', {a: balance});
      expect(component.userBalance$).toBeObservable(expected);
    });
  });

  describe('Markets$', () => {
    it('should be an observable of an array of Market objects', done => {
      const markets = generateMarkets();
      const store = TestBed.get(Store);
      store.pipe = jest.fn(() => cold('-a|', {a: markets}));

      fixture.detectChanges();

      component.markets$.pipe(last()).subscribe(componentMarkets => {
        expect(componentMarkets).toEqual(markets);
        done();
      });

      getTestScheduler().flush();
    });
  });

  describe('onPurhase', () => {
    it('should dispatch MarketPurchase action when onPursase is invoked', () => {
      const store = TestBed.get(Store);
      const event = {
        id: 20,
        market: {
          id: 4,
          name: 'National General Holdings Corp',
          category: 'Finance',
          price: '200'
        },
        quantity: '3',
        price: 200
      };
      const portfolio = {
        id: event.id,
        marketId: event.market.id,
        name: event.market.name,
        category: event.market.category,
        price: event.market.price,
        quantity: event.quantity,
      };
      const action = new MarketPurchase(portfolio);
      component.userBalance = 2000;
      const spy = jest.spyOn(store, 'dispatch');

      fixture.detectChanges();

      component.onPushase(event);

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
