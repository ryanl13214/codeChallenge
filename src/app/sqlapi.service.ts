import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClientModule } from '@angular/common/http';// for linking with the backend node server

@Injectable({
  providedIn: 'root'
})
export class SqlapiService {
  temp: number[];


test:any;
  baseUrl = 'http://localhost/API';
//baseUrl = 'https://zeno.computing.dundee.ac.uk/2019-projects5

   constructor(private http: HttpClient  ) { }



  getAllPolicys( ): Observable<any> {
      var temp = this.baseUrl+"/GetFullList.php";

          return this.http.get(temp).pipe(
            map((res) => {
             return res['data'];
          }));

 }

 getAllCustomernames( ): Observable<any> {
     var temp = this.baseUrl+"/getAllCustomernames.php";

         return this.http.get(temp).pipe(
           map((res) => {
            return res['data'];
         }));

}

updatePolicy(pk,customer_Name,policy_type,insurer_Name,premium,customer_address_street,customer_address_city,addresspk): Observable<any> {
    var temp = this.baseUrl+"/updatePolicy.php?pk="+pk+ "&customer_Name="+customer_Name+ "&policy_type="+policy_type+ "&insurer_Name="+insurer_Name+ "&premium="+premium+ "&customer_address_street="+customer_address_street + "&customer_address_city="+customer_address_city   + "&addresspk="+addresspk                        ;

        return this.http.get(temp).pipe(
          map((res) => {
           return res['data'];
        }));

}



}
