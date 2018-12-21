import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MarketsRoutingModule } from './markets-routing.module';
import { reducers } from './reducers';
import { MarketsEffects } from './effects/markets.effects';
import { MarketsService } from './services/markets.service';
import {MarketsComponent} from './containers/markets/markets.component';
import {MarketsListComponent} from './components/markets-list/markets-list.component';


export const COMPONENTS = [
  MarketsComponent,
  MarketsListComponent
];

@NgModule({
  imports: [
    CommonModule,
    MarketsRoutingModule,

    StoreModule.forFeature('markets', reducers),
    EffectsModule.forFeature([MarketsEffects]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [MarketsService]
})
export class MarketsModule { }
