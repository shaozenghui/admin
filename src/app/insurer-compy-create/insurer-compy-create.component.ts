import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from 'jquery';
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-insurer-compy-create',
  templateUrl: './insurer-compy-create.component.html',
  styleUrls: ['./insurer-compy-create.component.css']
})
export class InsurerCompyCreateComponent implements OnInit {
  comp_name;
  sign;
  updateParamsObj;
  createParamsObj;
  update_title = "insurerManagement/"+this.route.snapshot.queryParams["id"]+"/update/";
  create_title = "insurerManagement/create";
  constructor(
  	private titleService:Title,
  	private route:ActivatedRoute,
  	private ser:HttpsService ,
    private _message: NzMessageService,
  ) { }

  ngOnInit() {
  	 this.sign = this.route.snapshot.queryParams["sign"];
     if(this.sign == "change"){
      this.ser.update(this.update_title).subscribe(
         (data)=>{
         	this.comp_name = data.name;
         }
      )
     }
  }
  submit_1(){
  	this.createParamsObj = {
      "name": this.comp_name,
	  }
    if(this.comp_name == undefined){
          this._message.create("error",'公司名称为必填项！')
    }else{
        this.ser.updateSubmit(this.create_title,this.createParamsObj).subscribe(
           (data)=>{
             if(data.code == '200'){
               this._message.create("success",'保存成功！')
             }else{
                this._message.create("error",'公司名称已存在！')
             }
           }
        )
    }
  	
  }
  submit_2(){
  	this.updateParamsObj = {
  	    "name": this.comp_name,
  	}
    if(this.comp_name == undefined){
          this._message.create("error",'公司名称为必填项！')
    }else{
    	this.ser.updateSubmit(this.update_title,this.updateParamsObj).subscribe(
    	   (data)=>{
    	      if(data.code == '200'){
              this._message.create("success",'保存成功！')
            }else{
               this._message.create("error",'公司名称已存在！')
            }
    	   }
    	)
    }
  }
}
