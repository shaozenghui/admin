
import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UMeditorModule } from 'ngx-umeditor';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { HttpsService } from '../https.service';//引入服务
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;
  @ViewChild('full') full: AddCityComponent;
  requestTitle = "city/create/";
  config:any;
  cityList;
  sign;
  bsc_city_id:any = "1";
  yanglaobx;
  yanglaobx_comp;
  yiliaobx;
  yiliaobx_comp;
  shiyebx;
  shiyebx_comp;
  gongshangbx;
  gongshangbx_comp;
  shengyubx;
  shengyubx_comp;
  gongjijin_min;
  gongjijin_comp_min;
  gongjijin_max;
  gongjijin_comp_max;
  menzhenbaoxiao;
  zhuyuanbaoxiao;
  average_min;
  average_max;
  fund_average_min;
  fund_average_max;
  zhigongyibao_info = '';
  shiyeyibao_info = '';
  children_yibao = '';
  baoxiaoliucheng = '';
  content:any;
  createTitle = "city/create";
  updateTitle = "city/update/"+this.route.snapshot.queryParams["id"];
  updateParamsObj:any = {};
  createParamsObj:any = {};
  tabs:any = [];
  tabs2:any = [];
  aaaac:any;
  nzSelectedIndex:number = 0;
  premium_json:any = [];
  premium_json_obj:any = {};
  del_med_premium:any = [];
  editonContentChange(event){
    this.zhigongyibao_info = event;
  }
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService,
    private el: ElementRef,
    private _message: NzMessageService,
  ){
  }
  ngOnInit() {
      this.ckeConfig = {
        allowedContent: true,
        extraPlugins: 'divarea'
      };
     
      this.config = this.route.snapshot.data;
      this.titleService.setTitle(this.config.title);
      this.sign = this.route.snapshot.queryParams["sign"];
      this.ser.getCity(this.requestTitle).subscribe(
         (data)=>{
          this.cityList = data.city_list;
          for (var i = 0; i < 7; i++) {
            var obj = {
              med_insurance_type_name:"",
              med_insurance_type_id:"",
              menzhenbaoxiao:"",
              zhuyuanbaoxiao:"",
              menzhen_pay_standard:"",
              zhuyuan_pay_standard:"",
              yibao_info:"",
              bsc_city_id:this.bsc_city_id,
              wx_yibao_info:'',
              premium_json:[]
            };
            obj.med_insurance_type_name =  data.med_list[i][1];
            obj.med_insurance_type_id =  data.med_list[i][0];
            obj.menzhenbaoxiao =  "";
            obj.zhuyuanbaoxiao =  "";
            obj.menzhen_pay_standard =  "";
            obj.zhuyuan_pay_standard =  "";
            obj.yibao_info =  "";
            obj.wx_yibao_info =  ""; 
            this.tabs.push(obj);
            this.tabs2 = this.tabs;
          };
         }
      )
      if(this.sign == "change"){ 
        $("#select").attr({disabled: true});
        this.ser.update(this.updateTitle).subscribe(
          (data)=>{
            this.tabs2 = data.med_type;
            this.tabs = data.med_type;
            this.bsc_city_id = data.bsc_city_id;
            this.yanglaobx = data.yanglaobx;
            this.yanglaobx_comp = data.yanglaobx_comp;
            this.yiliaobx = data.yiliaobx;
            this.yiliaobx_comp = data.yiliaobx_comp;
            this.shiyebx = data.shiyebx;
            this.shiyebx_comp = data.shiyebx_comp;
            this.gongshangbx = data.gongshangbx;
            this.gongshangbx_comp = data.gongshangbx_comp;
            this.shengyubx = data.shengyubx;
            this.shengyubx_comp = data.shengyubx_comp;
            this.gongjijin_min = data.gongjijin_min;
            this.gongjijin_comp_min = data.gongjijin_comp_min;
            this.gongjijin_max = data.gongjijin_max;
            this.gongjijin_comp_max = data.gongjijin_comp_max;
            this.average_min = data.average_min;
            this.average_max = data.average_max;
            this.fund_average_min = data.fund_average_min;
            this.fund_average_max = data.fund_average_max;
            $('#btn').attr({
              disabled: false,
            });
          }
        )
      }
  }
  change_(e){
    for (var i = 0; i < this.tabs.length; i++) {
      this.tabs[i].bsc_city_id = this.bsc_city_id
    };
  }  
  ageStandard_(x,m){
    for (var i = 0; i < this.tabs2.length; i++) {
      if(this.tabs2[i].premium_json == ""){
            this.tabs2[i].premium_json = [];
      }
      if(x == this.tabs2[i].med_insurance_type_id){
        this.tabs2[i].premium_json.push({
           age_start:null,
           age_end:null,
           premium:null,
           bsc_city_id:this.bsc_city_id,
           med_insurance_type_id:m,
           id:''
        })
      }
    }
  }
  ageDel(a,b){
    for (var i = 0; i < this.tabs2.length; i++) {
      if(this.tabs2[i].med_insurance_type_id == a){
        if(this.tabs2[i].premium_json[b].id != ""){
          this.del_med_premium.push(this.tabs2[i].premium_json[b].id);
        }
        this.tabs2[i].premium_json.splice(b,1);
      }
    }
  }
  nzSelectedIndexChange(event){
    this.nzSelectedIndex = event;
  }
  umReady(){
    this.tabs =  this.tabs2;
  }
  submit_1(){
    var premium_json_arr = [];
        var flag = false;
        for (var i = 0; i < this.tabs2.length; i++) {
          for (var j = 0; j < this.tabs2[i].premium_json.length; j++) {
              this.tabs2[i].premium_json[j].bsc_city_id = this.bsc_city_id;
              if(this.tabs2[i].premium_json[j].age_start == null || this.tabs2[i].premium_json[j].age_end == null  || this.tabs2[i].premium_json[j].premium == null){
                this._message.create("error",this.tabs2[i].med_insurance_type_name+'你有信息未完善！');
                flag = false;
                return false;
              }else{
                premium_json_arr.push(this.tabs2[i].premium_json[j]);  
                flag = true;
              }
          }
        } 
       if(premium_json_arr.length == 0){
         flag = true;

       }
      for (var i = 0; i < this.tabs2.length; i++) {
         for (var j = 1; j < this.tabs2[i].premium_json.length; j++) {
           if(this.tabs2[i].premium_json[j].age_start == null || this.tabs2[i].premium_json[j].age_end == null  || this.tabs2[i].premium_json[j].premium == null){
             this._message.create("error",this.tabs2[i].med_insurance_type_name+'你有信息未完善！');
             flag = false;
             return false;
           }else if(this.tabs2[i].premium_json[j].age_end <= this.tabs2[i].premium_json[j].age_start){
                this._message.create("error",this.tabs2[i].med_insurance_type_name+'中最大年龄不能小于最小年龄');
                flag = false;
                return false;
            }else if(this.tabs2[i].premium_json[j].age_start <= this.tabs2[i].premium_json[j-1].age_end  && this.tabs2[i].premium_json[j].age_start != ""){
                this._message.create("error",this.tabs2[i].med_insurance_type_name+'中年龄添加重复')
                flag = false;
                return false;
            }else{
                 flag = true;
           }
            
         }
      }

    this.createParamsObj = {
        "bsc_city_id":this.bsc_city_id,
        "yanglaobx":this.yanglaobx,
        "yanglaobx_comp":this.yanglaobx_comp,
        "yiliaobx":this.yiliaobx,
        "yiliaobx_comp":this.yiliaobx_comp,
        "shiyebx":this.shiyebx,
        "shiyebx_comp":this.shiyebx_comp,
        "gongshangbx":this.gongshangbx,
        "gongshangbx_comp":this.gongshangbx_comp,
        "shengyubx":this.shengyubx,
        "shengyubx_comp":this.shengyubx_comp,
        "gongjijin_min":this.gongjijin_min,
        "gongjijin_comp_min":this.gongjijin_comp_min,
        "gongjijin_max":this.gongjijin_min,
        "gongjijin_comp_max":this.gongjijin_comp_min,
        "average_min":this.average_min,
        "average_max":this.average_max,
        "fund_average_min":this.fund_average_min,
        "fund_average_max":this.fund_average_max,
        'med_info':this.tabs,
        "med_premium":premium_json_arr
    }
    if(flag){
      this.ser.updateSubmit(this.requestTitle,this.createParamsObj).subscribe(
         (data)=>{
           if(data.code == '200'){
             this._message.create("success",'保存成功！')
           }else if(data.code == '502'){
             this._message.create("error",'该城市已存在！')
           }else{
            this._message.create("error",'你有信息未完善！')
           }
         }
      )
   }
  }       
  submit_2(){
    var premium_json_arr = [];
    var flag = false;
    for (var i = 0; i < this.tabs2.length; i++) {
      for (var j = 0; j < this.tabs2[i].premium_json.length; j++) {
          this.tabs2[i].premium_json[j].bsc_city_id = this.bsc_city_id;
          if(this.tabs2[i].premium_json[j].age_start == null || this.tabs2[i].premium_json[j].age_end == null  || this.tabs2[i].premium_json[j].premium == null){
            this._message.create("error",this.tabs2[i].med_insurance_type_name+'你有信息未完善！');
            flag = false;
            return false;
          }else{
            premium_json_arr.push(this.tabs2[i].premium_json[j]);  
            flag = true;
          }
      }
    } 
   if(premium_json_arr.length == 0){
     flag = true;

   }
    for (var i = 0; i < this.tabs2.length; i++) {
       for (var j = 1; j < this.tabs2[i].premium_json.length; j++) {
         if(this.tabs2[i].premium_json[j].age_start == null || this.tabs2[i].premium_json[j].age_end == null  || this.tabs2[i].premium_json[j].premium == null){
           this._message.create("error",this.tabs2[i].med_insurance_type_name+'你有信息未完善！');
           flag = false;
           return false;
         }else if(this.tabs2[i].premium_json[j].age_end <= this.tabs2[i].premium_json[j].age_start){
              this._message.create("error",this.tabs2[i].med_insurance_type_name+'中最大年龄不能小于最小年龄');
              flag = false;
              return false;
          }else if(this.tabs2[i].premium_json[j].age_start <= this.tabs2[i].premium_json[j-1].age_end  && this.tabs2[i].premium_json[j].age_start != ""){
              this._message.create("error",this.tabs2[i].med_insurance_type_name+'中年龄添加重复')
              flag = false;
              return false;
          }else{
               flag = true;
         }
          
       }
    }

    this.updateParamsObj = {
        "yanglaobx":this.yanglaobx,
        "yanglaobx_comp":this.yanglaobx_comp,
        "yiliaobx":this.yiliaobx,
        "yiliaobx_comp":this.yiliaobx_comp,
        "shiyebx":this.shiyebx,
        "shiyebx_comp":this.shiyebx_comp,
        "gongshangbx":this.gongshangbx,
        "gongshangbx_comp":this.gongshangbx_comp,
        "shengyubx":this.shengyubx,
        "shengyubx_comp":this.shengyubx_comp,
        "gongjijin_min":this.gongjijin_min,
        "gongjijin_comp_min":this.gongjijin_comp_min,
        "gongjijin_max":this.gongjijin_min,
        "gongjijin_comp_max":this.gongjijin_comp_min,
        "average_min":this.average_min,
        "average_max":this.average_max,
        "fund_average_min":this.fund_average_min,
        "fund_average_max":this.fund_average_max,
        'med_info':this.tabs,
        "med_premium":premium_json_arr,
        "del_med_premium":this.del_med_premium
    }
    if(flag){
      this.ser.updateSubmit(this.updateTitle,this.updateParamsObj).subscribe(
         (data)=>{
          if(data.code == '200'){
             this._message.create("success",'保存成功！')
           }else{
            this._message.create("error",'你有信息未完善！')
           }
         }
      )
    }
    
  }
}