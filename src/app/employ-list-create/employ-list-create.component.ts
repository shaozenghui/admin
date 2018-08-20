import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from  'jquery';
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-employ-list-create',
  templateUrl: './employ-list-create.component.html',
  styleUrls: ['./employ-list-create.component.css']
})
export class EmployListCreateComponent implements OnInit {
	username;
	first_name;
	password = '';
	is_superuser;
	is_active;
    sign;
  	update_title = "auth/user/"+this.route.snapshot.queryParams["id"]+"/change/";
  	create_title = "auth/user/add/";
  	updateParamsObj;
  	createParamsObj;
  	constructor(
	    private titleService:Title,
	    private route:ActivatedRoute,
	    private ser:HttpsService,
      private _message: NzMessageService,
	 ){}
  ngOnInit() {
     this.sign = this.route.snapshot.queryParams["sign"];
     this.is_active = $("#select option:selected").val();
     this.is_superuser = $("#select2 option:selected").val();
     if(this.sign == "change"){
      this.ser.update(this.update_title).subscribe(
         (data)=>{
           this.username = data.email;
           this.first_name = data.first_name;
           this.is_superuser = data.is_superuser;
           this.is_active = data.is_active;
           $("#select").val(this.is_active);
           $("#select2").val(this.is_superuser);
         }
      )
     }
  }
  change_(){
    this.is_active = $("#select option:selected").val();
  } 
  change_2(){
    this.is_superuser = $("#select2 option:selected").val();
  } 
  submit_1(){
      this.createParamsObj = {
	     "password": this.password,
		   "is_superuser": this.is_superuser,
		   "first_name": this.first_name,
		   "email":this.username,
		   "is_active": this.is_active
      }
      if(this.username == undefined){
          this._message.create("error",'登录账号为必填项！');
      }else if(this.first_name == undefined){
          this._message.create("error",'姓为必填项！');
      }else if(this.password == undefined){
          this._message.create("error",'密码为必填项！')
      }else{
          this.ser.updateSubmit(this.create_title,this.createParamsObj).subscribe(
             (data)=>{

                 if(data.code == '200'){
                   this._message.create("success",'保存成功！')
                 }else if(data.message.email){
                   this._message.create("error",data.message.email[0]+"!")
                 }else if(data.message.password){
                   this._message.create("error",data.message.password[0]+"!")
                 }
             }
          )
      }
  }
  submit_2(){
      this.updateParamsObj ={
	     "password": this.password,
		   "is_superuser": this.is_superuser,
		   "first_name": this.first_name,
		   "email":this.username,
		   "is_active": this.is_active
      }
      if(this.username == ""){
          this._message.create("error",'登录账号为必填项！');
      }else if(this.first_name == ""){
          this._message.create("error",'姓为必填项！');
      }else{
          this.ser.updateSubmit(this.update_title,this.updateParamsObj).subscribe(
             (data)=>{
               if(data.code == '200'){
                 this._message.create("success",'保存成功！')
               }else if(data.message.email){
                 this._message.create("error",data.message.email[0]+"!")
               }else if(data.message.password){
                 this._message.create("error",data.message.password[0]+"!")
               }
             }
          )
      }
  }
}