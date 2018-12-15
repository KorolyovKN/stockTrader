import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceContainerComponent } from './containers/balance-container/balance-container.component';
import { BalanceComponent } from './components/balance/balance.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BalanceContainerComponent, BalanceComponent],
  exports: [BalanceContainerComponent]
})
export class CoreModule { }
