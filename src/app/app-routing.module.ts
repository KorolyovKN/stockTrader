import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'markets', pathMatch: 'full'},
  {
    path: 'markets',
    loadChildren: 'src/app/markets/markets.module#MarketsModule'
  },
  {
    path: 'portfolios',
    loadChildren: 'src/app/portfolios/portfolios.module#PortfoliosModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
