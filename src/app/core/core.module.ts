import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceContainerComponent } from './containers/balance-container/balance-container.component';
import { BalanceComponent } from './components/balance/balance.component';
import {BalanceService} from './services/balance.service';
import { EffectsModule } from '@ngrx/effects';
import { BalanceEffects } from './effects/balance.effects';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([BalanceEffects])
  ],
  declarations: [BalanceContainerComponent, BalanceComponent],
  exports: [BalanceContainerComponent],
  providers: [BalanceService]
})
export class CoreModule { }
