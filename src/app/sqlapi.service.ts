import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SqlapiService {
  temp: number[];


test:any;
  // probably don't want to hard code this, consider making use of environment configs, i'm sure Angular will have that built in
  baseUrl = 'http://138.68.154.148/API';

   constructor(private http: HttpClient  ) { }

  getAllPolicys( ): Observable<any> {
    return this.getResponseData(this.baseUrl+"/GetFullList.php");
 }

 getAllCustomernames( ): Observable<any> {
   return this.getResponseData(this.baseUrl+"/getAllCustomernames.php");
}

updatePolicy(pk,customer_Name,policy_type,insurer_Name,premium,customer_address_street,customer_address_city,addresspk): Observable<any> {
  // this is not ideal, if you have another 10 fields to add it's going to get ugly
  // POST/PUT for HTTP requests that expect to write data, GET is generally for getting data
  return this.getResponseData(this.baseUrl+"/updatePolicy.php?pk="+pk+ "&customer_Name="+customer_Name+ "&policy_type="+policy_type+ "&insurer_Name="+insurer_Name+ "&premium="+premium+ "&customer_address_street="+customer_address_street + "&customer_address_city="+customer_address_city   + "&addresspk="+addresspk);
}

SavePolicyType(newPolicy_type){
  // see above regarding HTTP request types
  return this.getResponseData(this.baseUrl+"/SavePolicyType.php?newPolicy_type="+newPolicy_type);
}

SaveCustomer(customer_Name , customer_street_address , customer_city){
  return this.getResponseData(this.baseUrl+"/SaveCustomer.php?customer_Name="+customer_Name+ "&customer_address_street="+customer_street_address+ "&customer_address_city="+customer_city);
}

SavePolicy(premium , customer_Customer_Name , insurer_Insurer_Name , client_Client_Name, policy_type_policy_type){
  return this.getResponseData(this.baseUrl+"/SavePolicy.php?premium="+premium+ "&customer_Customer_Name="+customer_Customer_Name+ "&insurer_Insurer_Name="+insurer_Insurer_Name+ "&client_Client_Name="+client_Client_Name+ "&policy_type_policy_type="+policy_type_policy_type);
}
SaveInsurer(newInsurer){
  return this.getResponseData(this.baseUrl+"/SaveInsurer.php?newInsurer="+newInsurer);
}

getResponseData(url: string){
  return this.http.get(url).pipe(
    map((res) => {
     return res['data'];
  }));
}
}
