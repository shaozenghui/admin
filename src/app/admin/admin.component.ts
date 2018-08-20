import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import {FormGroup, FormControl, Validators} from '@angular/forms';
// 2. 引入ng2-validation中的组件
import {CustomValidators} from 'ng2-validation';
import * as $ from  'jquery';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username;
  update_title = "profileManagement/home";
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService,
    private router: Router
  ){}

  ngOnInit() {
    if( !localStorage.getItem('token')){
       this.router.navigate(['/login']);
    }
    this.ser.update(this.update_title).subscribe(
       (data)=>{
         this.username = data.first_name ;
       }
    )
  }
  submit_(){
      localStorage.clear();
      this.router.navigate(['/login']);
  }
}
