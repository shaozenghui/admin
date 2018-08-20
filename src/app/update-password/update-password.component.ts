import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from  'jquery';
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  now_password;
  new_password;
  confirm_password;
  update_title = "profileManagement/password_change";
  updateParamsObj;
 constructor(
     private titleService:Title,
     private route:ActivatedRoute,
     private ser:HttpsService,
     private _message: NzMessageService
   ){}

  ngOnInit() {

  }
  submit_1(){
      this.updateParamsObj = {
		   "password_old": this.now_password,
		   "password": this.new_password,
		   "password_confirm": this.confirm_password,
      }
      if(this.now_password == undefined){
          this._message.create("error",'请输入现有密码！')
      }else if(this.new_password == undefined){
          this._message.create("error",'请输入新密码！');
      }else if(this.confirm_password == undefined){
          this._message.create("error",'请确认密码！')
      }else{
        this.ser.updateSubmit(this.update_title,this.updateParamsObj).subscribe(
           (data)=>{
             if(data.code == 200){
                 this._message.create("success","密码修改成功！");
             }else if(data.code == 500){
                  this._message.create("error","原密码错误！");
             }else{
                  this._message.create("error","两次密码输入不一致！");
             }
           }
        )
      }
      
  }
}
