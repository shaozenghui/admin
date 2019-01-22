import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务import * as $ from 'jquery'
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-additional-risk',
  templateUrl: './additional-risk.component.html',
  styleUrls: ['./additional-risk.component.css']
})


export class AdditionalRiskComponent implements OnInit {
	_dataSet = [];
  config;
  _value = '';
  requestTitle:string = "insuranceManagement/attach/";
  deleteTitle;
  _current = 1;
   updUrl;
   DownloadUrl;
   DownloadUrl2;
   fil_suffix:string;
   insId = ''
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService,
    private _message: NzMessageService
  ){}
  ngOnInit() {
    this.insId = this.route.snapshot.queryParams["id"];
  		this.config = this.route.snapshot.data;
      this.titleService.setTitle(this.config.title);
        this.ser.searchList2(this.requestTitle,this.route.snapshot.queryParams["id"]).subscribe(
           (data)=>{
             localStorage.setItem('user_id',data.user_id);
             this._dataSet = data.result;
           }
        )

      
  }

   
  
  
  nzPageIndexChangeClick(e){
    localStorage.setItem('insurance_nzPageIndex',e);
  }
  
  confirm (x) {
    this.deleteTitle = "insuranceManagement/attach/"+x+"/product_delete";
    this.ser.delete_(this.deleteTitle).subscribe(
       (data)=>{
          if(data['code'] == '200'){
             this._message.create("success",'删除成功！');
             this.ser.searchList2(this.requestTitle,this.route.snapshot.queryParams["id"]).subscribe(
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


