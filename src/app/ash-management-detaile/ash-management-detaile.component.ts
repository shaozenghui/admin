import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UMeditorModule } from 'ngx-umeditor';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { HttpsService } from '../https.service';

@Component({
  selector: 'app-ash-management-detaile',
  templateUrl: './ash-management-detaile.component.html',
  styleUrls: ['./ash-management-detaile.component.css']
})
export class AshManagementDetaileComponent implements OnInit {

requestTitle = "/wxquestionlookup/"+this.route.snapshot.queryParams["id"];
  constructor(
    private titleService:Title,
    private route:ActivatedRoute,
    private ser:HttpsService,
    private el: ElementRef
  ){}
  questionData = [];
  suggest_policyData = [];
  income_year = "";
  expense_year = "";
  surplus = "";
  config:any;
  ngOnInit() {
  	this.config = this.route.snapshot.data;
  	this.titleService.setTitle(this.config.title);
  	this.ser.getCity(this.requestTitle).subscribe(
  	   (data)=>{
        this.income_year = data.analysis["income_year"];
        this.expense_year = data.analysis["expense_year"];
        this.surplus = data.analysis["surplus"];
        this.questionData = data.question;
        this.suggest_policyData = data.analysis["suggest_policy"];
  	   }
  	)
  }

}
