import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from 'jquery'
@Component({
  selector: 'app-city-management',
  templateUrl: './city-management.component.html',
  styleUrls: ['./city-management.component.css']
})
export class CityManagementComponent implements OnInit {
	_dataSet = [];
	_value;
	config:any;
  requestTitle = "city";
   _current = 1;
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
         this._dataSet = data;
         if(localStorage.getItem('city_nzPageIndex')){
             this._current = parseInt(localStorage.getItem('city_nzPageIndex'));
         }else{
              this._current = 1;
         }
       }
    )
      
  }
  nzPageIndexChangeClick(e){
    localStorage.setItem('city_nzPageIndex',e);
  }
  citySearch(){
    this.ser.searchList(this.requestTitle,this._value).subscribe(
       (data)=>{
         this._dataSet = data;
         this._current = 1;
       }
    )
  }
}
