import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'bank',
    loadChildren: () => import('./bank/bank.module').then(m => m.BankModule)
  },
  {
    path: 'leagues',
    loadChildren: () => import('./leagues/leagues.module').then(m => m.LeaguesModule)
  },
  {
    path: 'betslip',
    loadChildren: () => import('./betslip/betslip.module').then(m => m.BetslipModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
