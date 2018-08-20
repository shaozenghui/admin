import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from 'jquery';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
	_dataSet = [];
  config;
  _startDate = '';
  _endDate = '';
  _active = "";
  status_name ;
  requestTitle = "auth/user/";
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
      this.status_name = this._active;
      this.ser.getList(this.requestTitle).subscribe(
         (data)=>{
           this._dataSet = data.result;
           if(localStorage.getItem('employee_select_value2')){
              this.status_name = localStorage.getItem('employee_select_value2')
              this.requestPriams = "?timeStart="+this._startDate+"&timeEnd="+this._endDate+"&is_active="+this.status_name;
              this.ser.searchList2(this.requestTitle,this.requestPriams).subscribe(
                  (data)=>{
                    this._dataSet = data.result;
                    if(localStorage.getItem('employee_nzPageIndex')){
                        this._current = parseInt(localStorage.getItem('employee_nzPageIndex'));
                    }else{
                         this._current = 1;
                    }
                  }
               )
           }else{
             this.status_name = '';
             if(localStorage.getItem('employee_nzPageIndex')){
                 this._current = parseInt(localStorage.getItem('employee_nzPageIndex'));
             }else{
                  this._current = 1;
             }
           }
         }
      )
  }
  searchCustome(){
      this.requestPriams = "?timeStart="+this._startDate+"&timeEnd="+this._endDate+"&is_active="+this.status_name;
      this.ser.searchList2(this.requestTitle,this.requestPriams).subscribe(
         (data)=>{
           this._dataSet = data.result;
           this._current = 1;
         }
      )
  }
  nzPageIndexChangeClick(e){
    localStorage.setItem('employee_nzPageIndex',e);
  }
  ngOnDestroy() {
    localStorage.setItem('employee_select_value2',this.status_name);
  }
}
