import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpsService } from '../https.service';//引入服务
@Component({
  selector: 'app-insurance-company',
  templateUrl: './insurance-company.component.html',
  styleUrls: ['./insurance-company.component.css']
})
export class InsuranceCompanyComponent implements OnInit {
  requestTitle:string = "insurerManagement/";
  _dataSet = [];
  config;
  _value;
  _current = 1;
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService,
  ){}

  ngOnInit() {
  		this.config = this.route.snapshot.data;
      this.titleService.setTitle(this.config.title);
      this.ser.getList(this.requestTitle).subscribe(
         (data)=>{
           this._dataSet = data;
           if(localStorage.getItem('insurance_compy_nzPageIndex')){
               this._current = parseInt(localStorage.getItem('insurance_compy_nzPageIndex'));
           }else{
                this._current = 1;
           }
         }
      )
  }
   nzPageIndexChangeClick(e){
    localStorage.setItem('insurance_compy_nzPageIndex',e);
  }
  citySearch(){
    this.ser.searchList(this.requestTitle,this._value).subscribe(
       (data)=>{
         this._dataSet = data;
         this._current = 1;
       }
    )
  }


}