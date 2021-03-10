import { Component, OnInit , HostListener} from '@angular/core';
import {FormControl} from '@angular/forms';
import { SqlapiService } from '../sqlapi.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
currFocus:any= 1;
currPage:Number= 0;
isEdit:any=false;
isAdd:any=false;
items:any =[
		];
test:any =[];
    // for use in the lsit list controls how many items are displayed at once
    arrayOne(n: number): any[] {
      return Array(n);
    }

  constructor(private sqlapi:SqlapiService) { }
  public screenWidth: any;
  public screenHeight: any;
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

   this.sqlapi.getAllPolicys().subscribe((res: any) => {this.items =res ;});// gets the user ip address
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
