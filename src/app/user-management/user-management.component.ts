import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from 'jquery'
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  _dataSet = [];
	_value;
	config:any;
  requestTitle = "wxuser";
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService 
    ) {}
  ngOnInit() {
  	this.config = this.route.snapshot.data;
  	this.titleService.setTitle(this.config.title);
    this.ser.getList(this.requestTitle).subscribe(
       (data)=>{
         this._dataSet = data.result;
       }
    )    
  }
  citySearch(){
    this.ser.searchList(this.requestTitle,this._value).subscribe(
       (data)=>{
         this._dataSet = data.result;
       }
    )
  }
}
