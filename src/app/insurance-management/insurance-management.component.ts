import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-insurance-management',
  templateUrl: './insurance-management.component.html',
  styleUrls: ['./insurance-management.component.css']
})
export class InsuranceManagementComponent implements OnInit {
	_dataSet = [];
  config;
  _value = '';
  _value2 = '';
  requestTitle:string = "insuranceManagement";
  deleteTitle;
  _current = 1;
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService,
    private _message: NzMessageService
  ){}
  ngOnInit() {
  		this.config = this.route.snapshot.data;
      this.titleService.setTitle(this.config.title);
      if(localStorage.getItem('insurance_select_value2')){
          this._value2 = localStorage.getItem('insurance_select_value2')
          this.ser.searchList_ins(this.requestTitle,this._value,this._value2).subscribe(
             (data)=>{
               localStorage.setItem('user_id',data.user_id);
               this._dataSet = data.result;
               if(localStorage.getItem('insurance_nzPageIndex')){
                   this._current = parseInt(localStorage.getItem('insurance_nzPageIndex'));
               }else{
                    this._current = 1;
               }
             }
          )
      }else{
        this.ser.getList(this.requestTitle).subscribe(
           (data)=>{
             localStorage.setItem('user_id',data.user_id);
             this._dataSet = data.result;
             this._value2 = '';
             if(localStorage.getItem('insurance_nzPageIndex')){
                 this._current = parseInt(localStorage.getItem('insurance_nzPageIndex'));
             }else{
                  this._current = 1;
             }
           }
        )
      }
      
  }
  insuranceSearch(){
    this.ser.searchList_ins(this.requestTitle,this._value,this._value2).subscribe(
       (data)=>{
         this._dataSet = data.result;
         this._current = 1;
         localStorage.setItem('insurance_nzPageIndex',"1");
       }
    )
  }
  nzPageIndexChangeClick(e){
    localStorage.setItem('insurance_nzPageIndex',e);
  }
  ngOnDestroy() {
    localStorage.setItem('insurance_select_value2',this._value2);
  }
  confirm (x) {
    this.deleteTitle = "insuranceManagement/"+x+"/product_delete";
    this.ser.delete_(this.deleteTitle).subscribe(
       (data)=>{
          if(data['code'] == '200'){
             this._message.create("success",'删除成功！');
             this.ser.searchList_ins(this.requestTitle,this._value,this._value2).subscribe(
                (data)=>{
                  this._dataSet = data.result;
                }
             )
          }else{
            this._message.create("error",'删除失败！')
          }
       }
    )
  }
  
}
