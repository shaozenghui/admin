import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';//http服务模块
import { NgZorroAntdModule } from 'ng-zorro-antd';//ng-zorro
import { RouterConfigModule} from './router/router.module';// 路由
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy , LocationStrategy} from '@angular/common';

import { HttpsService } from   './https.service';// 服务

import {CustomFormsModule} from "ng2-validation";

import { UMeditorModule } from 'ngx-umeditor';


import { CommonModule }     from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
// 组件
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { CityManagementComponent } from './city-management/city-management.component';
import { InsuranceManagementComponent } from './insurance-management/insurance-management.component';
import { AddCityComponent } from './add-city/add-city.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { InsuranceCompanyComponent } from './insurance-company/insurance-company.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CustomerCreatComponent } from './customer-creat/customer-creat.component';
import { InsurerCompyCreateComponent } from './insurer-compy-create/insurer-compy-create.component';
import { EmployListCreateComponent } from './employ-list-create/employ-list-create.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { LoginComponent } from './login/login.component';
import { InsuranceManagementCreateComponent } from './insurance-management-create/insurance-management-create.component';
import { InsuranceRateComponent } from './insurance-rate/insurance-rate.component';
import { PersonalSetComponent } from './personal-set/personal-set.component';
import { RateEditingComponent } from './rate-editing/rate-editing.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AshManagementComponent } from './ash-management/ash-management.component';
import { PolicyManagementComponent } from './policy-management/policy-management.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PolicyDetailComponent } from './policy-detail/policy-detail.component';
import { AshManagementDetaileComponent } from './ash-management-detaile/ash-management-detaile.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CityManagementComponent,
    InsuranceManagementComponent,
    AddCityComponent,
    CustomerManagementComponent,
    InsuranceCompanyComponent,
    EmployeeListComponent,
    CustomerCreatComponent,
    InsurerCompyCreateComponent,
    EmployListCreateComponent,
    PersonalSetComponent,
    UpdatePasswordComponent,
    InsuranceManagementCreateComponent,
    InsuranceRateComponent,
    RateEditingComponent,
    UserManagementComponent,
    AshManagementComponent,
    PolicyManagementComponent,
    UserDetailComponent,
    PolicyDetailComponent,
    AshManagementDetaileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    RouterConfigModule,
    ReactiveFormsModule,
    CustomFormsModule,
    CommonModule,
    FileUploadModule,
    UMeditorModule.forRoot(),
    HttpClientModule
  ],
  providers:[HttpsService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  
  bootstrap: [AppComponent]
})
export class AppModule { }