import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
import * as $ from 'jquery'
import { FileUploader } from 'ng2-file-upload';
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-rate-editing',
  templateUrl: './rate-editing.component.html',
  styleUrls: ['./rate-editing.component.css']
})
export class RateEditingComponent implements OnInit {
   flag;
   id:string;
   submit_Params;
   age_min:string;
   age_max:string;
   selectedGenderOption;
   genderOptions;
   selectedSocialOption;
   socialOptions;
   selectedGradeleOption;
   GradeOptions;
   selectedPeriodOption;
   periodOptions;
   selectedPaymentOption;
   paymentOptions;
   DownloadUrl;
   DownloadUrl2;
   genderCheckbox = true;
   gradeCheckbox = true;
   socialCheckbox = true;
   periodCheckbox = true;
   paymentCheckbox = true;
   plan_name:string;
   plan_select:string;
   plan_max:string;
   plan_min:string;
   updUrl;
   user_id;
   requestTitle;
   main_id;
   insId;
   plan_id;
   attach;
   // 导出费率表
   exelTitle = "insuranceManagement/generate_excel";
   exelParams;
    constructor(
       private titleService:Title,
       private route:ActivatedRoute,
       private ser:HttpsService ,
       private _message: NzMessageService,
    ) {}
   ngOnInit() {
     this.attach = this.route.snapshot.queryParams["attach"];
     this.main_id = this.route.snapshot.queryParams["main_id"];
     this.insId = this.route.snapshot.queryParams["insId"];
     this.plan_id = this.route.snapshot.queryParams["id"];
     if(this.attach == 'true'){
       this.requestTitle = "insuranceManagement/attach/"+this.main_id+"/"+this.insId+'/'
     +this.plan_id+"/ratio_edit";
     }else{
        this.requestTitle = "insuranceManagement/"+this.insId+'/'
     +this.plan_id+"/ratio_edit";
     }
    this.genderOptions = [
      { value:1,label:'男'},
      { value:2,label:'女'}
    ]
    this.socialOptions = [
      { value:1,label:'有'},
      { value:0,label:'无'}
    ]
    this.GradeOptions = [
      { value:1,label:'1类'},
      { value:2,label:'2类'},
      { value:3,label:'3类'},
      { value:4,label:'4类'},
      { value:5,label:'5类'},
      { value:6,label:'6类'},
    ]
     this.flag = false;
     this.id = this.route.snapshot.queryParams["id"];
     this.plan_name = this.route.snapshot.queryParams["schedule_name"];
     this.plan_select = this.route.snapshot.queryParams["amount_type"];
     this.plan_max = this.route.snapshot.queryParams["amount_max"];
     this.plan_min = this.route.snapshot.queryParams["amount_min"];

    this.ser.getList(this.requestTitle).subscribe(
       (data)=>{
        this.age_min = data.model_condition.age_min;
        this.age_max = data.model_condition.age_max;
        this.paymentOptions = data.payment_period_list;
        this.periodOptions = data.guarantee_period_list;
        this.selectedGradeleOption = data.model_condition.career_type;
        this.selectedGenderOption = data.model_condition.gender;
        this.selectedPeriodOption =  data.model_condition.guarantee_period;
        this.selectedPaymentOption = data.model_condition.payment_period;
        this.selectedSocialOption = data.model_condition.social_guarantee;
         function toNumber(obj){
           for (var i = 0; i < obj.length; i++) {
               obj[i][0] =   Number(obj[i][0]);
           };
         }
         toNumber(this.paymentOptions);
         toNumber(this.periodOptions);
     }
    )

   }
   public uploader:FileUploader = new FileUploader({
        method: "POST",
   });
   selectedFileOnChanged(e){
      var that = this;
      that.updUrl = e.target.value.split('fakepath')[1].substring(1);
      that.uploader.queue[0].onSuccess = function (response, status, headers) {
        if (status == 200) {
            that._message.create("success",'上传成功！')
        } else {
            that._message.create("error",'上传失败！');
        }

      };
      that.uploader.queue[0].upload();
   }
   uploadFile() {
        $('#file').click();
        this.uploader.options.url = "http://118.89.170.246:8001/api/insuranceManagement/upload_excel/"+localStorage.getItem('user_id')
    }
  endit(){
  	this.flag = false;
  	$('#endit input').removeAttr('disabled');
  }
  dowloadFile(){
    if(this.attach == 'true'){
      var DownloadUrl = "insuranceManagement/attach/"+this.insId+'/'
      + this.plan_id+"/download_excel";
    }else{
      var DownloadUrl = "insuranceManagement/"+ this.main_id+'/'
      +this.plan_id+"/download_excel";
    }
     this.ser.getList(DownloadUrl).subscribe(
        (data)=>{
           this.DownloadUrl2 = "http://118.89.170.246"+data.url;
           window.location.href = this.DownloadUrl2;
        }
     )
  }
  disabled(){
    this.flag = true;
    $('#endit input:checkbox').attr({'disabled':'true'});
    $('#endit input:text').attr({'disabled':'true'});
  	this.exelParams = {
  		"age_min": this.age_min,
  		"age_max": this.age_max,
      'age_check':'1',
  	}
    if(this.genderCheckbox){
      this.exelParams.gender_check = '1';
    	this.exelParams.gender = this.selectedGenderOption;
    }
    if(this.socialCheckbox){
      this.exelParams.social_guarantee_check = '1';
    	this.exelParams.social_guarantee = this.selectedSocialOption;

    }
    if(this.gradeCheckbox){
      this.exelParams.career_type_check = '1';
    	this.exelParams.career_type = this.selectedGradeleOption;
    }
    if(this.paymentCheckbox){
      this.exelParams.payment_period_check = '1';
    	this.exelParams.payment_period = this.selectedPaymentOption ;
    }
    if(this.periodCheckbox){
      this.exelParams.guarantee_period_check = '1';
    	this.exelParams.guarantee_period = this.selectedPeriodOption;
    }
  	this.ser.updateSubmit(this.exelTitle,this.exelParams).subscribe(
  	   (data)=>{
  	    this.DownloadUrl = "http://118.89.170.246"+data.url;
  	   }
  	)
  }
  submit_(){
    this.submit_Params = {
      "id":this.insId,
      "schedule_id":this.plan_id,
      "gender":this.selectedGenderOption ,
      "social_guarantee": this.selectedSocialOption,
      "age_min": this.age_min.toString(),
      "age_max": this.age_max.toString(),
      "career_type": this.selectedGradeleOption,
      "guarantee_period": this.selectedPeriodOption,
      "payment_period": this.selectedPaymentOption,
    }
    this.ser.updateSubmit(this.requestTitle,this.submit_Params).subscribe(
       (data)=>{
           if(data.code == '200'){
            this._message.create("success",'保存成功！');

          }else{
            this._message.create("error",'保存失败！')
          }
       }
    )
  }
  back_(){
      window.history.back();
  }
}


