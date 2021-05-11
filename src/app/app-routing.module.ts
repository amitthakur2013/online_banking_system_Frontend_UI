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
import { AddBillerComponent } from './components/add-biller/add-biller.component';
import { ManageBillerComponent } from './components/manage-biller/manage-biller.component';

import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
{
	path:"",
	component:HomeComponent,
	pathMatch:'full',
	data : {  
      title: 'Online Banking Portal-Home'  
  }  
},
{
	path:"banking/login",
	component:LoginComponent,
	data : {  
      title: 'Online Banking Portal-Login'  
  }  
},
{
	path:"banking/account/dashboard",
	component:DashboardDetailsComponent,
	data : {  
      title: 'Online Banking Portal-Dashboard'  
  }  ,
	canActivate:[AuthGuard]
},
{
	path:"banking/account/details/:id",
	component:AccountDetailsComponent,
	data : {  
      title: 'Online Banking Portal-Account Info'  
  }  ,
	canActivate:[AuthGuard]
},
{
	path:"banking/transfer/fund_transfer",
	component:FundTransferComponent,
	data : {  
      title: 'Online Banking Portal-Fund Transfer'  
  }  ,
	canActivate:[AuthGuard]
},
{
	path:"banking/transfer/manage_beneficiary",
	component:ManageBeneficiaryComponent,
	data : {  
      title: 'Online Banking Portal-Manage Beneficiary'  
  }  ,
	canActivate:[AuthGuard]
},
{
	path:"banking/transfer/manage_beneficiary/add",
	component:AddBeneficiaryComponent,
	data : {  
      title: 'Online Banking Portal-Add Beneficiary'  
  }  ,
	canActivate:[AuthGuard]
},
{
	path:"banking/transfer/manage_beneficiary/:id",
	component:UpdateBeneficiaryComponent,
	data : {  
      title: 'Online Banking Portal-Update Beneficiary'  
  }  ,
	canActivate:[AuthGuard]
},
{
	path:"banking/payments/manage_biller/add",
	component:AddBillerComponent,
	data : {  
      title: 'Online Banking Portal-Add Biller'  
  }  ,
	canActivate:[AuthGuard]
},
{
	path:"banking/payments/manage_biller",
	component:ManageBillerComponent,
	data : {  
      title: 'Online Banking Portal-Manage Biller'  
  }  ,
	canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
