import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddUserDetailsRequestBody } from '../models/AddUserDetailsRequestBody';
import { RegesterAdminRequestBody } from '../models/RegesterAdminRequestBody';
import { UserDetailsRequest } from '../models/UserDetaislRequest';
import { UserRequest } from '../models/UserRequest';

@Injectable({
  providedIn: 'root'
})
export class UserRegestrationService {

  constructor(private httpCLient : HttpClient) { }


  saveAdminCreds(userRequest : RegesterAdminRequestBody):Observable<any>{

    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
             .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'POST, GET, HEAD, OPTIONS')
    const options = {
              headers: headers,
              observe: 'response' as const
          }
    return this.httpCLient.post(`http://localhost:8082/api/v1/regesterAdmin`, userRequest, options)
    .pipe(
      map(result=>{
        return result;
      })
    )


  }

  saveUserDetails(UserDetailsRequest : AddUserDetailsRequestBody):Observable<any>{

    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
             .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'POST, GET, HEAD, OPTIONS')
    const options = {
              headers: headers,
              observe: 'response' as const
          }

          return this.httpCLient.post(`http://localhost:8082/api/v1/addUserDetails`, UserDetailsRequest, options)
    .pipe(
      map(result=>{
        return result;
      })
    )

  }

}
