
import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UMeditorModule } from 'ngx-umeditor';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { HttpsService } from '../https.service';//引入服务

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  requestTitle = "wxuserlookup/"+this.route.snapshot.queryParams["id"];
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService 
    ) {}
  userdetail = {};
  config;
  questionData = [{},{}];
  src:string;
  ngOnInit() {
  	this.config = this.route.snapshot.data;
  	this.titleService.setTitle(this.config.title);
    this.ser.getList(this.requestTitle).subscribe(
       (data)=>{
       	this.userdetail = data;
        this.src = data.userInfo.avatarUrl
       }
    )    
  }

}
