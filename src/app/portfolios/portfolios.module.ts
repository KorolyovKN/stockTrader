import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PortfoliosRoutingModule } from './portfolios-routing.module';
import { reducers } from './reducers';
import {PortfoliosEffects} from './effects/portfolios.effects';
import {PortfoliosService} from './services/portfolios.service';
import {PortfoliosComponent} from './containers/portfolios/portfolios.component';
import {PortfoliosListComponent} from './components/portfolios-list/portfolios-list.component';

export const COMPONENTS = [
  PortfoliosComponent,
  PortfoliosListComponent
];

@NgModule({
  imports: [
    CommonModule,
    PortfoliosRoutingModule,

    StoreModule.forFeature('portfolios', reducers),
    EffectsModule.forFeature([PortfoliosEffects])
  ],
  declarations: COMPONENTS,
  providers: [PortfoliosService]
})
export class PortfoliosModule { }
