import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from 'jquery'

@Component({
  selector: 'app-ash-management',
  templateUrl: './ash-management.component.html',
  styleUrls: ['./ash-management.component.css']
})
export class AshManagementComponent implements OnInit {
_dataSet = [];
	_value;
	config:any;
  requestTitle = "wxquestion";
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
}