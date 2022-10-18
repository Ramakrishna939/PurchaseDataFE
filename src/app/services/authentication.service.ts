import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthoritiesList } from '../models/AuthoritiesList';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  constructor(
    private httpCLient : HttpClient
  ) { }

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_ROLE = 'authenticatedUserRole';
   username: any;
   password: any;
   role:any;
   result : any;

   

   authenticationService(username: String, password: String) {
      console.log("username and password", username, "  ", password)
    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
             .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'POST, GET, HEAD, OPTIONS')
            .set('Authorization', 'Basic ' + window.btoa(username + ":" + password));

            const options = {
              headers: headers,
              observe: 'response' as const
          }
    return this.httpCLient.get(`http://localhost:8082/api/v1/logIn`,
    options)
    .pipe(
      map(result =>{
        this.result = result;
        console.log("Result", this.result, this.result.body.authorities[0].authority);
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
      })
    )
  }


  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username : any, password: any) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    //sessionStorage.setItem(this.USER_ROLE, this.result.body.authorities[0]);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    //let role = sessionStorage.getItem(this.USER_ROLE)
    console.log("User and role", user);
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }


}
