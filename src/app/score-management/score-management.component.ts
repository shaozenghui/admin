import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from 'jquery';
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-score-management',
  templateUrl: './score-management.component.html',
  styleUrls: ['./score-management.component.css']
})
export class ScoreManagementComponent implements OnInit {
  requestTitle:string = "customerManagement/user/"+this.route.snapshot.queryParams["id"]+"/select_product/";
  _allChecked = false;
  _indeterminate = false;
  _displayData = [];
  _dataSet = [];
  config;
  comp_value = '';
  ins_value = '';
  requestPriams;
  insurance_type = [];
  status_name ="";
  product = [];
  product_nums;
  sel_nums;
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService,
    private _message: NzMessageService,
  ){}
   ngOnInit() {
  	  this.config = this.route.snapshot.data;
      this.titleService.setTitle(this.config.title);
      this.ser.getList(this.requestTitle).subscribe(
         (data)=>{
         	for(var key in data.insurance_type){
         		this.insurance_type.push({
         			id:key,
         			val:data.insurance_type[key]
         		})
         	}
         	data.result.forEach((el)=>{
         		el.checked = el.selId ? true : false;
         	})
           this._dataSet = data.result; 
           this.product_nums = data.product_nums;
           this.sel_nums = data.sel_nums;
         }
      )
  }  
  searchCustome(){
  	this.requestPriams = "?search_name="+this.ins_value+"&search_type="+this.status_name+"&search_comp="+this.comp_value;
  	this.ser.searchList2(this.requestTitle,this.requestPriams).subscribe(
  	   (data)=>{
  	     this._dataSet = data.result;
  	   
  	   }
  	)
  }
  _displayDataChange($event) {
     this._displayData = $event;
     this._refreshStatus();
   };

   _refreshStatus() {
     const allChecked = this._displayData.every(value => value.checked === true);
     const allUnChecked = this._displayData.every(value => !value.checked);
     this._allChecked = allChecked;
     this._indeterminate = (!allChecked) && (!allUnChecked);
 	if(allChecked){
 	  this.sel_nums = this.product_nums;
 	}else{
 		var con = 0;
 		this._displayData.forEach((el)=>{
 			if(el.checked){
 				con++
 			}
 		})
 		this.sel_nums = con;
 	}
   };
  _checkAll(value) {
     if (value) {
       this._displayData.forEach(data => {
         data.checked = true;
       });
       this.sel_nums = this.product_nums;
     } else {
       this._displayData.forEach(data => {
         data.checked = false;
         this.sel_nums = 0;
       });
     }
     this._refreshStatus();

   };
   // 保存
   submit(){
   	 this.product = [];
   	 this._displayData.forEach((el,index,arr)=>{
   	 	this.product.push({
   	 		"check_status":el.checked ? 1 : 0,
   	 		"product_id":el.id,
   	 		"score":Number(el.score),
   	 		"id":el.selId
   	 	})
   	 })
   	 var ParamsObj = {
   	 	"product":this.product
   	 }
   	this.ser.updateSubmit(this.requestTitle,ParamsObj).subscribe(
       (data)=>{
         if(data.code == '200'){
           this._message.create("success",'保存成功！')
         }else {
           this._message.create("error",'保存失败！');
         }
       }
    )
   }

}

