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
   requestTitle;
   deteleTitle;
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
   insId;
   attach_id;
   amount_type;
   flag;
   flag2;
   attachflag = false;
   main_id;
   attach;
   defaulArr:any = {
      name:'',
      amount_type:2,
      amount_min:'',
      amount_max:'',
      id:0,
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
      //判断是否是附加险
      if(this.attach){
         this.attachflag = true;
         this.requestTitle = "insuranceManagement/attach/"+this.attach_id+"/ratio/";
         this.deteleTitle = "insuranceManagement/attach/schedule_delete";
      }else{
        this.attachflag = false;
        this.requestTitle = "insuranceManagement/"+this.main_id+"/ratio/";
        this.deteleTitle = "insuranceManagement/schedule_delete";
      }
      this.ser.getList(this.requestTitle).subscribe(
         (data)=>{
           this.insId = data.model.id;
           this.has_schedule = data.model.has_schedule;
           if(data.model_schedules.length > 0){
             this.model_schedules = data.model_schedules;
             this.flag = true;
           }else{
             this.flag = false;
             if(data.model_schedule.amount_type == null){
                this.model_schedule = {
                   amount_type:1,
                   amount_min:'',
                   amount_max:'',
                   id:0,
                   ins_product_id:0
                }
             }else{
                 this.model_schedule = data.model_schedule;
             }
            
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
  delete_(x,e){
      this.detelteParams = {
        "id": x,
        "product_id": this.insId 
      }
      $(e.target).parents('.plan_item').remove();
      this.ser.updateSubmit(this.deteleTitle,this.detelteParams).subscribe(
       (data)=>{
          if(data.code == '200'){
            this._message.create("success",'删除成功！');
             window.location.reload();
            if(($('.plan_item').length-1) == 0 ){
              this.has_schedule = 0;
            }
          }
       }
      )
  }
}
