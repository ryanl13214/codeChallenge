import { Component, OnInit , HostListener} from '@angular/core';
import {FormControl} from '@angular/forms';
import { SqlapiService } from '../sqlapi.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
currFocus:any=1;
currPage:any= 0;
isEdit:any=false;
isAdd:any=false;
items:any =[ ];

test:any =[];
premiumSort: string = '';

CustomerName: string = '';
Policytype: string = '';
Insurer: string = '';
Premium: string = '';
Street: string = '';
City: string = '';
    // for use in the lsit list controls how many items are displayed at once



    arrayOne(n: number): any[] {
      if(( this.currPage *4 )  > this.items.length){
        return Array(  Math.abs( this.currPage *4-   this.items.length   ));

      }else{
var tmp = Math.abs( this.currPage *4-   this.items.length   );
if(tmp > 4){tmp=4;}

          return Array(tmp);


}


    }




    setFocused(a){
      this.currFocus=a;
    }

gerPremiumImg(){

if(this.premiumSort == ''){


}else if(this.premiumSort == 'asc'){

return "100px";
  }else  {
return "100px";

  }



}

sortPremium(){
if(this.premiumSort == ''){
  this.sortByPremium('asc');
    this.premiumSort = 'asc';
  var  mainDisplay = document.getElementById("up").style.display = "inline-block";
  var  mainDisplay = document.getElementById("down").style.display = "none";
  var  mainDisplay = document.getElementById("net").style.display = "none";


}else if(this.premiumSort == 'asc'){
  this.premiumSort = 'dec';
    this.sortByPremium('dec');
  var  mainDisplay = document.getElementById("up").style.display = "none";
  var  mainDisplay = document.getElementById("down").style.display = "inline-block";
  var  mainDisplay = document.getElementById("net").style.display = "none";
}else  {
  this.premiumSort = '';
  var  mainDisplay = document.getElementById("up").style.display = "none";
  var  mainDisplay = document.getElementById("down").style.display = "none";
  var  mainDisplay = document.getElementById("net").style.display = "inline-block";
}


}


sortByPremium(direction){
if(direction== "asc"){
  for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {

    var a =  Number(this.items[i].premium);
      var b = Number(this.items[j  ].premium) ;
    console.log(a ," is bigger than " ,b,   a>b);
			if ( a <  b) {
				let temp = this.items[i];
				this.items[i] = this.items[j ];
				this.items[j   ] = temp;
			}
		}
	}
}


if(direction== "dec"){

    for (let i = 0; i < 4; i++) {
  		for (let j = 0; j < 4; j++) {

      var a =  Number(this.items[i].premium);
        var b = Number(this.items[j  ].premium) ;
      console.log(a ," is bigger than " ,b,   a>b);
  			if ( a >  b) {
  				let temp = this.items[i];
  				this.items[i] = this.items[j ];
  				this.items[j   ] = temp;
  			}
  		}
  	}
  }








console.log(JSON.stringify(this.items));

}











  constructor(private sqlapi:SqlapiService) { }
  public screenWidth: any;
  public screenHeight: any;
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

   this.sqlapi.getAllPolicys().subscribe((res: any) => {this.items =res ;});// gets the user ip address

  }

changepage(i){
if(i==1 && this.currPage >0 ){
  this.currPage = this.currPage - 1;
}
if(i==2 && this.currPage < ( this.items.length /4)){
  this.currPage = this.currPage + 1;
}

}


Save(){

var pk = this.items[this.currFocus].PolicyPK;
var addresspk = this.items[this.currFocus].address_PK;
this.sqlapi.updatePolicy(pk,this.CustomerName,this.Policytype,this.Insurer,this.Premium,this.Street,this.City,addresspk);



}


AddItem(){
  if(!this.isAdd){// add focused check
  var  mainDisplay = document.getElementById("Display").style.display = "none";
  var  mainDisplay = document.getElementById("AddItem").style.display = "block";
  var  mainDisplay = document.getElementById("EditItem").style.display = "none";
  }else{
  var  mainDisplay = document.getElementById("Display").style.display = "block";
  var  mainDisplay = document.getElementById("EditItem").style.display = "none";
  var  mainDisplay = document.getElementById("AddItem").style.display = "none";
  }
   this.isAdd = !this.isAdd;
}

alternateBetweenEditAndDisplay(){
if(!this.isEdit){// add focused check
var  mainDisplay = document.getElementById("Display").style.display = "none";
var  mainDisplay = document.getElementById("AddItem").style.display = "none";
var  mainDisplay = document.getElementById("EditItem").style.display = "block";
}else{
var  mainDisplay = document.getElementById("Display").style.display = "block";
var  mainDisplay = document.getElementById("EditItem").style.display = "none";
}
 this.isEdit = !this.isEdit;
}



  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
}
