import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MarketsComponent} from './containers/markets/markets.component';

const routes: Routes = [
  {
    path: '',
    component: MarketsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketsRoutingModule { }
