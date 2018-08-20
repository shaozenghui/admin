import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from  'jquery';
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-personal-set',
  templateUrl: './personal-set.component.html',
  styleUrls: ['./personal-set.component.css']
})
export class PersonalSetComponent implements OnInit {
  config;
  username;
  first_name;
  last_name;
  updateParamsObj;
  update_title = "profileManagement/home";
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService,
    private _message: NzMessageService,
  ){}
	ngOnInit() {
    this.username = localStorage.getItem('username');
		this.config = this.route.snapshot.data;
  	this.titleService.setTitle(this.config.title);
		this.ser.update(this.update_title).subscribe(
		   (data)=>{
		     this.first_name = data.first_name;
		   }
		)
	}
  submit_1(){
      this.updateParamsObj = {
		   "first_name": this.first_name,
      }
      if(this.first_name == ''){
          this._message.create("error",'姓为必填项！')
      }else{
        this.ser.updateSubmit(this.update_title,this.updateParamsObj).subscribe(
           (data)=>{
             if(data.code == '200'){
               this._message.create("success",'保存成功！')
             }
             window.location.reload();
           }
        )
      }
  }
}
