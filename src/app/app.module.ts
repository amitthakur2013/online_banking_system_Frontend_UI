import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardDetailsComponent } from './components/dashboard-details/dashboard-details.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './services/auth.interceptor';
import { FundTransferComponent } from './components/fund-transfer/fund-transfer.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { ManageBeneficiaryComponent } from './components/manage-beneficiary/manage-beneficiary.component';
import {MatIconModule} from '@angular/material/icon';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UpdateBeneficiaryComponent } from './components/update-beneficiary/update-beneficiary.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    NavBarComponent,
    DashboardDetailsComponent,
    AccountDetailsComponent,
    FundTransferComponent,
    ManageBeneficiaryComponent,
    AddBeneficiaryComponent,
    UpdateBeneficiaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [[{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
