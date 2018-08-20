import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from 'jquery';
@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {
  requestTitle:string = "customerManagement/user/";
  _dataSet = [];
  config;
  comp_value = '';
  _startDate = '';
  _endDate = '';
  _option  = '';
  status_name;
  requestPriams;
   _current = 1;
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService,
  ){}
  ngOnInit() {
  	  this.config = this.route.snapshot.data;
      this.titleService.setTitle(this.config.title);
      this.status_name = this._option;
      this.ser.getList(this.requestTitle).subscribe(
         (data)=>{
           this._dataSet = data.result;
           if(localStorage.getItem('insurance_select_value2')){
               this.status_name = localStorage.getItem('insurance_select_value2');
               this.requestPriams = "?timeStart="+this._startDate+"&timeEnd="+this._endDate+"&name="+this.comp_value+"&status="+this.status_name;
               this.ser.searchList2(this.requestTitle,this.requestPriams).subscribe(
                  (data)=>{
                    this._dataSet = data.result;
                    if(localStorage.getItem('insurance_nzPageIndex')){
                        this._current = parseInt(localStorage.getItem('insurance_nzPageIndex'));
                    }else{
                         this._current = 1;
                    }
                  }
               )
           }else{
             this.status_name = '';
             if(localStorage.getItem('insurance_nzPageIndex')){
                 this._current = parseInt(localStorage.getItem('insurance_nzPageIndex'));
             }else{
                  this._current = 1;
             }
           }
         }
      )
  }  
  nzPageIndexChangeClick(e){
    localStorage.setItem('insurance_nzPageIndex',e);
  }
  ngOnDestroy() {
    localStorage.setItem('insurance_select_value2',this.status_name);
  }
  searchCustome(){
      this.requestPriams = "?timeStart="+this._startDate+"&timeEnd="+this._endDate+"&name="+this.comp_value+"&status="+this.status_name;
      this.ser.searchList2(this.requestTitle,this.requestPriams).subscribe(
         (data)=>{
           this._dataSet = data.result;
           this._current = 1;
         }
      )
  }


}
