import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from  'jquery';
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitParams;
  password;
  config;
  username;
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService,
    private router: Router,
    private _message: NzMessageService
  ){}
  ngOnInit() {
	   this.config = this.route.snapshot.data;
	   this.titleService.setTitle(this.config.title);

  }
  submit_(){
      this.submitParams = {
          "username":this.username,
          "password":this.password,
      }
      this.ser.login(this.submitParams);
  }
  
}