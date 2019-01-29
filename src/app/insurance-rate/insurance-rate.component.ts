import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from 'jquery';
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-insurance-rate',
  templateUrl: './insurance-rate.component.html',
  styleUrls: ['./insurance-rate.component.css']
})
export class InsuranceRateComponent implements OnInit {
    // 请求计划
   requestTitle;
//    删除计划
   deteleTitle;
//    保存计划
   saveTitle;
   model_schedules:any = [];
   model_schedule:any = {
      amount_type:'2',
      amount_min:'',
      amount_max:'',
      id:0,
      ins_product_id:0
   } ;
   has_schedule;
   detelteParams;
   saveParams;
   insId;
   attach_id;
   amount_type;
   flag = true;
   flag2;
   attachflag = false;
   main_id;
   attach;
   defaulArr:any = {
      name:'',
      amount_type:2,
      amount_min:'',
      amount_max:'',
      id:"0",
      ins_product_id:0
   };   
   constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService ,
    private _message: NzMessageService,

    ) {}
  ngOnInit() {
  	  this.attach_id = this.route.snapshot.queryParams["attach_id"];
      this.main_id = this.route.snapshot.queryParams["insId"];
      this.attach = this.route.snapshot.queryParams["attach"];
    //   判断是否是附加险
      if(this.attach){
         this.attachflag = true;
         this.requestTitle = "insuranceManagement/attach/"+this.attach_id+"/ratio/";
         this.deteleTitle = "insuranceManagement/attach/schedule_delete";
         this.saveTitle = "insuranceManagement/attach/schedule_edit";
      }else{
        this.attachflag = false;
        this.requestTitle = "insuranceManagement/"+this.main_id+"/ratio/";
        this.deteleTitle = "insuranceManagement/schedule_delete";
        this.saveTitle = "insuranceManagement/schedule_edit";
      }
      this.ser.getList(this.requestTitle).subscribe(
         (data)=>{
           this.insId = data.id; 
           if(data.model_schedules.length == 0){
            this.model_schedules.push({
                amount_type:1,
                amount_min:'',
                amount_max:'',
                id:"0",
                ins_product_id:0
            })
           }else{
            this.model_schedules = data.model_schedules
           }
         }
      )
  }
  add_plan(){
    this.model_schedules.push(this.defaulArr);
    this.flag = true;
  }
  selectChange(e){
     $(e.target).val(e.target.value);
     this.model_schedules[$(e.target).parents(".ng-star-inserted").index()].amount_type = e.target.value;
  }
  selectChange2(e){  
     $(e.target).val(e.target.value);
     this.model_schedule.amount_type = e.target.value;
  }
//   保存計劃
    save_plan(item,idx){
        if(this.model_schedules[0].name == false){
            this._message.create("error",'名称不能为空');
        }else if(item.name == ""){
            this._message.create("error",'请填写计划名称');
        }else if(item.amount_min == ""){
            this._message.create("error",'请填写最低保额');
        }else if(item.amount_max == ""){
            this._message.create("error",'请填写最高保额');
        }else if(item.amount_min > item.amount_max){
            this._message.create("error",'最低保额不能大于最高保额');
        }else{
            this.saveParams = {
                "id": item.id,
                "product_id": this.insId ,
                "schedule_name": item.name,
                "amount_type": item.amount_type,
                "amount_min": item.amount_min,
                "amount_max": item.amount_max,
            }
            this.ser.updateSubmit(this.saveTitle,this.saveParams).subscribe(
                (data)=>{
                    console.log(data.schedule_id)
                   if(data.code == '200'){
                     this._message.create("success",'保存成功！');
                     this.model_schedules[idx].id = data.schedule_id
                   }
                }
            )
        }
        
    }
//   刪除計劃
  delete_(x,e){
      this.detelteParams = {
        "id": x,
        "product_id": this.insId 
      }
      if(x != "0"){ 
        this.ser.updateSubmit(this.deteleTitle,this.detelteParams).subscribe(
         (data)=>{
            if(data.code == '200'){
              this._message.create("success",'删除成功！');
              if(($('.plan_item').length-1) == 0 ){
                this.has_schedule = 0;
              }
            }
         }
        )
      }
      $(e.target).parents('.plan_item').remove();
     
  }
}
