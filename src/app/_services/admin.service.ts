import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'})
};


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  headers;
 
  constructor(private http: HttpClient) { }

  getAllUsers(){
    console.log("all users");
    return this.http.get(`/server/users`, {headers:this.headers});  

  }

  getUserByMail(mail:string){
    console.log("get user by mail : " + mail);

    return this.http.get(`/server/user/mail/`+mail, {headers:this.headers});  
  }

  registerUser(formData){
    console.log("register user : "+ formData);
    return this.addUser(formData);
  }

  addUser(user: User) {
    let body = JSON.stringify(user);
    console.log(body);
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    return this.http.post(`/server/register`, body, {headers:this.headers});  
  }

  updateUser(mail: string, user: User) {
    let body = JSON.stringify(user);
    console.log(body);
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    console.log("check mail : " + mail );
    return this.http.post('/server/update-user/'+mail, body, {headers:this.headers});  
  }


  removeUser(mail: string) {
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    console.log("check mail : " + mail );
    return this.http.delete('/server/remove-user/'+mail, {headers:this.headers});  
  }

  changePassword(passwordData: any) {
    this.headers =  new HttpHeaders({'Content-Type':'application/json'}) ;   
    this.headers = this.headers.append('Authorization', "Bearer "+localStorage.getItem('token'));
    console.log("check mail : " + passwordData.mail );
    return this.http.post('/server/change-password/',  passwordData, {headers:this.headers});  
  }

}

