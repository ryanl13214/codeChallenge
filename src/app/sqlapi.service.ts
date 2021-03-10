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







}
