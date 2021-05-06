import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardDetailsComponent } from './components/dashboard-details/dashboard-details.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { FundTransferComponent } from './components/fund-transfer/fund-transfer.component';
import {ManageBeneficiaryComponent} from './components/manage-beneficiary/manage-beneficiary.component';
import {AddBeneficiaryComponent} from './components/add-beneficiary/add-beneficiary.component';
import { UpdateBeneficiaryComponent } from './components/update-beneficiary/update-beneficiary.component';

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
	path:"banking/account/dashboard",
	component:DashboardDetailsComponent,
	canActivate:[AuthGuard]
},
{
	path:"banking/account/details/:id",
	component:AccountDetailsComponent,
	canActivate:[AuthGuard]
},
{
	path:"banking/transfer/fund_transfer",
	component:FundTransferComponent,
	canActivate:[AuthGuard]
},
{
	path:"banking/transfer/manage_beneficiary",
	component:ManageBeneficiaryComponent,
	canActivate:[AuthGuard]
},
{
	path:"banking/transfer/manage_beneficiary/add",
	component:AddBeneficiaryComponent,
	canActivate:[AuthGuard]
},
{
	path:"banking/transfer/manage_beneficiary/:id",
	component:UpdateBeneficiaryComponent,
	canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
