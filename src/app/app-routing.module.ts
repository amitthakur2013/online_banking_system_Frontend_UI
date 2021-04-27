import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardDetailsComponent } from './components/dashboard-details/dashboard-details.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';

import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
{
	path:"",
	component:HomeComponent,
	pathMatch:'full'
},
{
	path:"banking/login",
	component:LoginComponent
},
{
	path:"dashboard",
	component:DashboardComponent,
	canActivate:[AuthGuard]
},
{
	path:"banking/account/dashboard",
	component:DashboardDetailsComponent,
	canActivate:[AuthGuard]
},
{
	path:"banking/account/details/:id",
	component:AccountDetailsComponent,
	canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
