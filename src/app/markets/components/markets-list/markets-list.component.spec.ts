import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Market, generateMarkets } from '../../models/market';
import { MarketsListComponent } from './markets-list.component';
import {ChangeDetectionStrategy} from '@angular/core';

describe('MarketsListComponent', () => {
  let component: MarketsListComponent;
  let fixture: ComponentFixture<MarketsListComponent>;
  const markets = generateMarkets();

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [MarketsListComponent]
    })
      .overrideComponent(MarketsListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display table list of markets', () => {
    component.pending = false;
    fixture.detectChanges();
    const tbodyDebugElement = fixture.debugElement.query(By.css('tbody'));
    const tbodyEl = tbodyDebugElement.nativeElement as HTMLTableRowElement;
    component.markets = markets;
    fixture.detectChanges();
    expect(tbodyEl.childElementCount).toEqual(markets.length);

    const firstTd = tbodyEl.querySelector('tr:first-child td:first-child');
    expect(firstTd.textContent).toEqual(markets[0].name);
  });

  it('should send market and quantity when clicked', () => {
    component.pending = false;
    component.markets = markets;
    fixture.detectChanges();
    const market = markets[0];
    const quantity = '10';
    const purchaseInfo = {
      market: market,
      quantity: quantity,
    };

    const btnDebugElem = fixture.debugElement.query(By.css('tbody>tr:first-child .purchaseBtn'));
    const inputDebugElem = fixture.debugElement.query(By.css('tbody>tr:first-child input'));
    const inputEl = inputDebugElem.nativeElement;
    inputEl.value = quantity;
    inputEl.dispatchEvent(new Event('input'));
    let selectedMarket: any;
    component.purchased.subscribe(payload => (selectedMarket = payload));

    btnDebugElem.triggerEventHandler('click', null);
    expect(selectedMarket).toEqual(purchaseInfo);


  });
});
