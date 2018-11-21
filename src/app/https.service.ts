import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
@Injectable()
export class HttpsService {
  // 定义请求的路径
  token;
  constructor(
    private http: HttpClient,
    private router: Router,
    private _message: NzMessageService) {
    this.token =  localStorage.getItem('token');
  }
 
   // 登录
  login(obj){
     localStorage.setItem('username',obj.username);
     let url:string = "http://118.89.170.246:8001/api/login";
     return this.http.post(url,obj,
      {headers:new HttpHeaders().set("Access-Control-Allow-Origin", "*")
     }).subscribe(
         (data)=>{
  
            if(data['code'] == '200'){
               localStorage.setItem('token',data['token']);
               this.router.navigate(['/admin']);
               this.token = data['token'];
               this._message.create("success",'登录成功！')
            }else{
              this._message.create("error",'用户名或密码错误！')
            }
         }
      );
  }
  
  // 获取列表
  getList(obj):Observable<any>{
    let url:string = "http://118.89.170.246:8001/api/"+obj;
    return this.http.get(url,
    { headers:new HttpHeaders().set('Authorization','Token  '+ this.token)
    });
  }

  // 获取城市管理里面城市列表
  getCity(title):Observable<any>{
    let url:string = "http://118.89.170.246:8001/api/"+title;
    return this.http.get(url,
    { headers:new HttpHeaders().set('Authorization','Token  '+ this.token)
    });
  }

  // 搜索列表
  searchList(title1,title2):Observable<any>{
    let url:string = "http://118.89.170.246:8001/api/"+title1+"?name="+title2;
    return this.http.get(url,
    { headers:new HttpHeaders().set('Authorization','Token  '+ this.token)
    });
  }

   // 保险管理搜索列表
  searchList_ins(title1,title2,title3):Observable<any>{
    let url:string = "http://118.89.170.246:8001/api/"+title1+"?name="+title2+"&category_type="+title3;
    return this.http.get(url,
    { headers:new HttpHeaders().set('Authorization','Token  '+ this.token)
    });
  }

 //带日期状态搜索
 searchList2(title,obj):Observable<any>{
   let url:string = "http://118.89.170.246:8001/api/"+title+obj;
    return this.http.get(url,
    { headers:new HttpHeaders().set('Authorization','Token  '+ this.token)
    });
 }


 // 修改信息
  update(title):Observable<any>{
    let url:string = "http://118.89.170.246:8001/api/"+title;
    return this.http.get(url,
    { headers:new HttpHeaders().set('Authorization','Token  '+ this.token)
    });
  }



  // 保存修改客户信息
  updateSubmit(title,obj):Observable<any>{
    let url:string = "http://118.89.170.246:8001/api/"+title;
    return this.http.post(url,obj,
    { headers:new HttpHeaders().set('Authorization','Token  '+ this.token)
    });
 }

 // 保险管理删除
 
  delete_(title):Observable<any>{
    let url:string = "http://118.89.170.246:8001/api/"+title;
    return this.http.get(url,
    { headers:new HttpHeaders().set('Authorization','Token  '+ this.token)
    });
  }

}



