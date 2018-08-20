import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from  'jquery';
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-customer-creat',
  templateUrl: './customer-creat.component.html',
  styleUrls: ['./customer-creat.component.css']
})
export class CustomerCreatComponent implements OnInit {
	_startDate ;
	_endDate ;
	comp_name;
	username;
	password;
	num;
	status_name = 1;
  word_download_status = 0
  sign;
  firstname;
  firstname_falg = true;
  update_title = "customerManagement/user/"+this.route.snapshot.queryParams["id"]+"/change/";
  create_title = "customerManagement/user/add/";
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
     if(this.sign == "change"){
      $('#comp_name').attr({disabled:true});
      $('#username').attr({disabled:true});
      this.firstname_falg = false;
      this.ser.update(this.update_title).subscribe(
         (data)=>{
           this._startDate = data.start_date;
           this._endDate  = data.end_date ;
           this.comp_name = data.name;
           this.username = data.email;
           this.password = data.password_hash;
           this.num = data.customer_num;
           this.status_name = data.status;
           this.word_download_status = data.word_download_status;
           this.firstname = data.firstname;
         }
      )
     }
  }

	submit_1(){
      
      this.createParamsObj = {
          "name": this.comp_name,
          "email": this.username,
          "password_hash": this.password,
          "status": this.status_name,
          "customer_num": this.num,
          "start_date": this._startDate,
          "end_date": this._endDate,
          "firstname": this.firstname,
          "word_download_status":this.word_download_status
      }

      if(this.firstname == undefined){
          this._message.create("error",'管理员名字为必填项！')
      }else if(this.comp_name == undefined){
          this._message.create("error",'公司名称为必填项！')
      }else if(this.username == undefined){
          this._message.create("error",'登录账号为必填项！');
      }else if(this.password == undefined){
          this._message.create("error",'密码为必填项！')
      }else if(this.num == undefined){
          this._message.create("error",'账号数为必填项！');
      }else if(this._startDate == undefined){
          this._message.create("error",'开始日期为必填项！');
      }else if(this._endDate == undefined){
          this._message.create("error",'结束日期为必填项！');
      }else{
        $('#submit_').attr({disabled: true});
        this.ser.updateSubmit(this.create_title,this.createParamsObj).subscribe(
           (data)=>{
             if(data.code == '200'){
               this._message.create("success",'保存成功！')
             }else if(data.message_user.email){
               this._message.create("error",data.message_user.email[0]+"!");
               $('#submit_').removeAttr('disabled')
             }else if(data.message.name){
               this._message.create("error",'公司名称已经存在！');
               $('#submit_').removeAttr('disabled')
             }else if(data.message.start_date){
               this._message.create("error",'开始日期不能大于结束日期！');
               $('#submit_').removeAttr('disabled')
             }
           }
        )
      }  
  }
  submit_2(){
      this.updateParamsObj = {
          "name": this.comp_name,
          "email": this.username,
          "password_hash": this.password,
          "status": this.status_name,
          "customer_num": this.num,
          "start_date": this._startDate,
          "end_date": this._endDate,
          "word_download_status":this.word_download_status
      }
      if(this.password == undefined){
          this._message.create("error",'密码为必填项！')
      }else if(this.num == undefined){
          this._message.create("error",'账号数为必填项！');
      }else if(this._startDate == undefined){
          this._message.create("error",'开始日期为必填项！');
      }else if(this._endDate == undefined){
          this._message.create("error",'结束日期为必填项！');
      }else{
        this.ser.updateSubmit(this.update_title,this.updateParamsObj).subscribe(
           (data)=>{
              if(data.code == '200'){
                this._message.create("success",'保存成功！')
              }else if(data.message_user.email){
                this._message.create("error",data.message_user.email[0]+"!")
              }else if(data.message.start_date){
                this._message.create("error",'开始日期不能大于结束日期！')
              }
           }
        )
      }
  }
}
