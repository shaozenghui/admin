import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务import * as $ from 'jquery'
import { FileUploader } from 'ng2-file-upload';
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
   updUrl;
   DownloadUrl;
   DownloadUrl2;
   fil_suffix:string;
   uploadID = ''
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
  public uploader:FileUploader = new FileUploader({     
            method: "POST",
            allowedFileType:["image","xls","video","audio","pdf","compress","doc","ppt"],
            autoUpload: false,    
  });
   
  selectedFileOnChanged(e){
       var that = this;
       that.updUrl = e.target.value.split('.')[1]; 
       that.uploader.queue[0].onSuccess = function (response, status, headers) {
           if (status == 200) {
               that._message.create("success",'上传成功！')
           } else {
               that._message.create("error",'上传失败！');
           }
       };
       that.uploader.queue[0].upload();
  }
  uploadFile(x){
     var that = this;
     $('#file').click();
     that.uploader.options.url = '';
     that.uploader.options.url = "http://118.89.170.246:8001/api/insuranceManagement/"+x+"/upload_file/";
     that.uploader.onBuildItemForm = function(fileItem,form){
          form.append('file_suffix',that.updUrl)//这个是自己定义的参数
          form.append('user_id',localStorage.getItem('user_id'))
         
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
