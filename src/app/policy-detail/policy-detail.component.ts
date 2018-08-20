
import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UMeditorModule } from 'ngx-umeditor';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import {NzMessageService} from 'ng-zorro-antd';
import { HttpsService } from '../https.service';//引入服务
@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.css']
})
export class PolicyDetailComponent implements OnInit {
  requestTitle = "/wxpolicylookup/"+this.route.snapshot.queryParams["id"];
  requestTitle2 = "wxAgentSelect/";

  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService,
    private el: ElementRef,
    private _message: NzMessageService,
  ){
    
  }
  policyDetail = {};
  consult;
  config;
  comNameList = [];
  proNameList = [];
  comNameList_id:any;
  comName:any;
  proNameList_id:any;
  proName:any;
  text_area:any = "";
  flag2_ = false;
  flag_ = false;
  questionData = [{}];
  selectedOption;
  searchOptions;
  isVisibleMiddle = false;
 showModalMiddle = () => {
   this.isVisibleMiddle = true;
 }
 handleOkMiddle(){
   this.flag_ = true;
   this.isVisibleMiddle = false;
   for (var i = 0; i < this.comNameList.length; i++) {
     if(this.comNameList[i][0] == this.comNameList_id){
       this.comName = this.comNameList[i][1]
     }
   };
   for (var i = 0; i < this.proNameList.length; i++) {
     if(this.proNameList[i][0] == this.proNameList_id){
       this.proName = this.proNameList[i][1]
     }
   };
 }
 handleCancelMiddle = (e) => {
   this.isVisibleMiddle = false;
   this.flag_=false;
 }
 change_(){
  this.ser.searchList2(this.requestTitle2,this.comNameList_id).subscribe(
     (data)=>{
     this.proNameList = data.user_list;
     this.proNameList_id =this.proNameList[0][0] ;  
     }
  )
 }
 change2_(){
 }
 submit_(){
   var submit_params = {
      "answer": this.text_area,
      "agent_id": this.proNameList_id,
      "agent_name": this.proName,
   }
   if(this.text_area == ""){
      this._message.create("error",'请填写回复内容！')
   }else if(this.proNameList_id == ""){
      this._message.create("error",'请选择经纪人！')
   }else{
    this.ser.updateSubmit(this.requestTitle,submit_params).subscribe(
       (data)=>{
         if(data.code == '200'){
            this._message.create("success",'发送成功！')
          }else{
           this._message.create("error",'发送失败！')
          }
       }
    )
   }
    
 }
  ngOnInit() {
  	this.config = this.route.snapshot.data;
  	this.titleService.setTitle(this.config.title);
  	this.ser.getCity(this.requestTitle).subscribe(
  	   (data)=>{
        this.comNameList = data.city_list;
        this.comNameList_id =this.comNameList[0][0] ;
  	    this.policyDetail = data.policy_info;
        this.text_area = data.policy_info.answer;
  	    this.consult = data.policy_info.image_path.split(",");
        this.ser.searchList2(this.requestTitle2,this.comNameList_id).subscribe(
           (data)=>{
           this.proNameList = data.user_list;
           this.proNameList_id =this.proNameList[0][0] ;  
           }
        )
  	   }
  	);
  }

}
