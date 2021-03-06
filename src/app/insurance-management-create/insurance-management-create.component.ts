import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UMeditorModule } from 'ngx-umeditor';
import {FormBuilder, FormGroup,Validators,FormControl} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { HttpsService } from '../https.service';//引入服务
import {NzMessageService} from 'ng-zorro-antd';
@Component({
  selector: 'app-insurance-management-create',
  templateUrl: './insurance-management-create.component.html',
  styleUrls: ['./insurance-management-create.component.css']
})
export class InsuranceManagementCreateComponent implements OnInit {
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;
  @ViewChild('full') full: InsuranceManagementCreateComponent;
  insurers;
  insurers_id;
  insurers_name = '' ;
  category_type = '';
  category_type_select;
  category = '';
  category_select = '';
  payment_method;
  payment_method_select;
  insurname = '';
  score;
  info ;
  requestTitle ;
  createTitle ;
  updateTitle ;
  updateParamsObj;
  createParamsObj;
  sign;
  config;
  flag;
  guarantee_pattern;
  guarantee_pattern_select;
  category_;
  policy_pattern;
  policy_pattern_select;
  product_list = [];
  state_select;
  brother_id = '';
  start_time = '';
  end_time = '';
  cityList = [];
  cityListSelect = [];
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private ser:HttpsService,
    private _message: NzMessageService,
    private el: ElementRef
  ){}
   editonContentChange(event){
  }
  ngOnInit() {
    // 判断是否是附加险
    if(this.route.snapshot.queryParams["attach"]){
      this.requestTitle = "insuranceManagement/attach/create/"+this.route.snapshot.queryParams["id"];
      this.createTitle = "insuranceManagement/attach/create/"+this.route.snapshot.queryParams["id"];
      this.updateTitle = "insuranceManagement/attach/"+this.route.snapshot.queryParams["id"]+"/update/";
    }else{
      this.requestTitle = "insuranceManagement/create";
      this.createTitle = "insuranceManagement/create";
      this.updateTitle = "insuranceManagement/"+this.route.snapshot.queryParams["id"]+"/update/";
    }
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'divarea'
    };
  	 this.config = this.route.snapshot.data;
  	 this.titleService.setTitle(this.config.title);
     this.sign = this.route.snapshot.queryParams["sign"];
     if(this.sign == "change"){
       this.ser.update(this.updateTitle).subscribe(
         (data)=>{
          for (var key in data.city_list) {
            this.cityList.push({
              value:Number(key),
              label:data.city_list[key]
            })
          }
           for(var key in data.product_list){
             this.product_list.push({
               id:Number(key),
               val:data.product_list[key]
             })
           }
          data.model.city_list.forEach((item, index) => {
            this.cityListSelect.push(...item)
          })
           this.brother_id = data.model.brother_id;
           this.start_time = data.model.start_time;
           this.end_time = data.model.end_time;

           // 状态
             this.state_select = data.model.is_active;
           // 险种
           this.category = data.category;
           this.category_ = this.category[data.model.category_type - 1 ][1];
           this.category_select = data.model.get_category;

          // 险种类型
           this.category_type = data.category_type;
           this.category_type_select = data.model.category_type;
           // 保险公司
           this.insurers = data.insurers;
           // 保险公司选中的
           this.insurers_id = data.model.insurer_id ;
           this.insurers_name = data.model.insurer_id;


           this.score =  data.model.score;
           this.insurname = data.model.name;
           this.info = data.model.info;
           // 消费型
           this.policy_pattern = data.policy_pattern;
           this.policy_pattern_select = data.model.policy_pattern;
           // 定期型
            this.guarantee_pattern = data.guarantee_pattern;
           this.guarantee_pattern_select = data.model.guarantee_pattern;

           // 支付方式
           this.payment_method = this.category[data.model.category_type - 1 ][2];
           this.payment_method_select = data.model.payment_method;
         }
       )
     }else{
           this.ser.getCity(this.requestTitle).subscribe(
              (data) => {

                for (var key in data.city_list) {
                  this.cityList.push({
                    value:Number(key),
                    label:data.city_list[key]
                  })
                }
                for(var key in data.product_list){
                  this.product_list.push({
                    id:Number(key),
                    val:data.product_list[key]
                  })
                }
                this.category_type = data.category_type;
                this.category = data.category;
                this.state_select = '1';
                 this.guarantee_pattern = data.guarantee_pattern;
                 this.guarantee_pattern_select = data.guarantee_pattern[0][0];

                 this.policy_pattern = data.policy_pattern;
                 this.policy_pattern_select = data.policy_pattern[0][0];

                 this.insurers = data.insurers;
                 this.insurers_name = data.insurers[0][0];
                 this.insurers_id = data.insurers[0][0];

                 this.category_ = data.category[0][1];
                 this.category_select = data.category[0][1][0][0];

                 this.category_type_select = data.category_type[0][0];

                 this.payment_method = data.category[0][2];
                 this.payment_method_select = data.category[1][2][0][0];

                 this.flag = true
              }
           )
     }
  }
  dateFrom(date){
    function formatTen(num) {
      return num > 9 ? (num + '') : ('0' + num)
    }
    if (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      // return year + '-' + formatTen(month) + '-' + formatTen(day)
      return  year + formatTen(month) + formatTen(day)
    } else return ''
  }
  insurers_() {
     this.insurers_id = $('#insurers option:selected').val();
  }
  changeCategory_type(e){
    this.payment_method = this.category[e.target.value -1 ][2];
    this.category_ = this.category[e.target.value -1 ][1]
    this.category_select = this.category_[0][0];
  }
  submit_1() {
  	 this.createParamsObj = {
  	    "name": this.insurname ,
  	    "insurer_id": this.insurers_id ,
  	    "category_type":this.category_type_select,
  	    "category":this.category_select,
  	    "score": this.score,
  	    "payment_method":this.payment_method_select,
  	    "info": this.info,
        "policy_pattern":this.policy_pattern_select,
        "guarantee_pattern":this.guarantee_pattern_select,
        "is_active":this.state_select,
        "brother_id":this.brother_id,
        "start_time":this.dateFrom(this.start_time) ,
        "end_time": this.dateFrom(this.end_time) ,
        "city": this.cityListSelect
     }
     if(this.insurname == ''){
        this._message.create("error",'名称为必填项！');
     }else if(this.score == undefined){
        this._message.create("error",'评分为必填项！')
     }else if(!this.start_time){
          this._message.create("error",'开始时间为必填项！');
      }else if(!this.end_time){
        this._message.create("error",'结束时间为必填项！')
      }else{
         this.ser.updateSubmit(this.createTitle,this.createParamsObj).subscribe(
            (data)=>{
             if(data.code == '200'){
               this._message.create("success",'保存成功！')
             }
            }
         )
     }

  };
  submit_2(){
     this.updateParamsObj = {
        "name": this.insurname ,
        "insurer_id": this.insurers_id ,
        "category_type":this.category_type_select,
        "category":this.category_select,
        "score": this.score,
        "payment_method":this.payment_method_select,
        "info": this.info,
        "policy_pattern":this.policy_pattern_select,
        "guarantee_pattern":this.guarantee_pattern_select,
        "is_active":this.state_select,
        "brother_id":this.brother_id,
        "start_time":this.dateFrom(new Date(this.start_time)) ,
        "end_time":this.dateFrom(new Date(this.end_time)) ,
        "city": this.cityListSelect
     }
     if(this.insurname == ''){
        this._message.create("error",'名称为必填项！');
     }else if(this.score == undefined){
        this._message.create("error",'评分为必填项！')
     }else if(!this.start_time){
      this._message.create("error",'开始时间为必填项！');
      }else if(!this.end_time){
        this._message.create("error",'结束时间为必填项！')
      }else{
       this.ser.updateSubmit(this.updateTitle,this.updateParamsObj).subscribe(
          (data)=>{
           if(data.code == '200'){
             this._message.create("success",'保存成功！')
           }
          }
       )
     }
  }
}
