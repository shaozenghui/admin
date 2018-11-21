import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';



import { CityManagementComponent } from '../city-management/city-management.component';
import { AdminComponent } from '../admin/admin.component';
import { InsuranceManagementComponent } from '../insurance-management/insurance-management.component';
import { AddCityComponent } from '../add-city/add-city.component';
import { CustomerManagementComponent } from '../customer-management/customer-management.component';
import { InsuranceCompanyComponent } from '../insurance-company/insurance-company.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { CustomerCreatComponent } from '../customer-creat/customer-creat.component';
import { InsurerCompyCreateComponent } from '../insurer-compy-create/insurer-compy-create.component';
import { EmployListCreateComponent } from '../employ-list-create/employ-list-create.component';
import { PersonalSetComponent } from '../personal-set/personal-set.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { LoginComponent } from '../login/login.component';
import { InsuranceManagementCreateComponent } from '../insurance-management-create/insurance-management-create.component';
import { InsuranceRateComponent } from '../insurance-rate/insurance-rate.component';
import { RateEditingComponent } from '../rate-editing/rate-editing.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { AshManagementComponent } from '../ash-management/ash-management.component';
import { PolicyManagementComponent } from '../policy-management/policy-management.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { PolicyDetailComponent } from '../policy-detail/policy-detail.component';
import { AshManagementDetaileComponent } from '../ash-management-detaile/ash-management-detaile.component';
import { ScoreManagementComponent } from '../score-management/score-management.component';
 const config:Routes = [
 	{
 		path:'login',
 		component:LoginComponent,
 		data:{title:'登录'}
 	},
 	{
 		path:'admin',
 		component:AdminComponent,
 		data:{title:'城市管理'},
 		children:[
 			{
 				path:'policy-detail',
 				component:PolicyDetailComponent,
 				data:{title:'保单详情'}
 			},
 			{
 				path:'user-detail',
 				component:UserDetailComponent,
 				data:{title:'用户详情'}
 			},
 		    {
 				path:'user-management',
 				component:UserManagementComponent,
 				data:{title:'用户管理'}
 			},
 		    {
 				path:'ash-management',
 				component:AshManagementComponent,
 				data:{title:'小智管理'}
 			},
 			{
 				path:'ash-management-detaile',
 				component:AshManagementDetaileComponent,
 				data:{title:'分析详情'}
 			},
 			{
 				path:'policy-management',
 				component:PolicyManagementComponent,
 				data:{title:'保单咨询'}
 			},
 			{
 				path:'insurance-rate',
 				component:InsuranceRateComponent,
 				data:{title:'费率'}
 			},
 			{
 				path:'insurer-compy-create',
 				component:InsurerCompyCreateComponent,
 				data:{title:'保险公司'}
 			},
 			{
 				path:'city-management',
 				component:CityManagementComponent,
 				data:{title:'城市管理'}
 			},
 			{
 				path:'insurance-management',
 				component:InsuranceManagementComponent,
 				data:{title:'保险管理'}
 			},
 			{
 				path:'insurance-management-create',
 				component:InsuranceManagementCreateComponent,
 				data:{title:'保险产品'}
 			},
 			{
 				path:'add-city',
 				component:AddCityComponent,
 				data:{title:'城市编辑'}
 			},
 			{
 				path:'customer-management',
 				component:CustomerManagementComponent,
 				data:{title:'客户管理'}
 			},
 			{
 				path:'customer-creat',
 				component:CustomerCreatComponent,
 				data:{title:'客户管理'}
 			},
 			{
 				path:'insurance-company',
 				component:InsuranceCompanyComponent,
 				data:{title:'保险公司'}
 			},
 			{
 				path:'employee-list',
 				component:EmployeeListComponent,
 				data:{title:'员工管理'}
 			},
 			{
 				path:'employ-list-create',
 				component:EmployListCreateComponent,
 			},
 			{
 				path:'personal-set',
 				component:PersonalSetComponent,
 				data:{title:'个人设置'}
 			},
 			{
 				path:'update-password',
 				component:UpdatePasswordComponent,
 				data:{title:'修改密码'}
 			},
 			{
 				path:'rate-editing',
 				component:RateEditingComponent,
 				data:{title:'费率编辑'}
 			},
 			{
 				path:'score-management',
 				component:ScoreManagementComponent,
 				data:{title:'保险管理'}
 			},
 			{path:'',redirectTo:'city-management',pathMatch:"full"}
 		]
 	},
 	{path:'',redirectTo:'login',pathMatch:"full"}
 ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(config)
  ],
  declarations: [],
  exports:[RouterModule]
})
export class RouterConfigModule { }
