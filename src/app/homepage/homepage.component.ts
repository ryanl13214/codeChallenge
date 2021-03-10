import { Component, OnInit , HostListener} from '@angular/core';
import {FormControl} from '@angular/forms';
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
items:any =[{
				"customer_name": "ABC Joinery",
				"customer_address_street": "12 Ascott Street",
				"customer_address_city": "Dundee",
				"premium": 123.87,
				"policy_type": "Public Liability",
				"insurer_name": "Aviva"
			},
			{
				"customer_name": "XYZ Plumbing",
				"customer_address_street": "24 Fleet Street",
				"customer_address_city": "Glasgow",
				"premium": 2321.45,
				"policy_type": "Public Liability",
				"insurer_name": "Allianz"
			},
			{
				"customer_name": "Fast Taxis",
				"customer_address_street": "324b Bank Street",
				"customer_address_city": "Aberdeen",
				"premium": 59897.00,
				"policy_type": "Motor Fleet",
				"insurer_name": "Aviva"
			},
			{
				"customer_name": "Fast Taxis",
			 	"customer_address_street": "324b Bank Street",
				"customer_address_city": "Aberdeen",
				"policy_type": "Public Liability",
			  "premium": 6845.00,
				"insurer_name": "QBE"
			}
		];

    // for use in the lsit list controls how many items are displayed at once
    arrayOne(n: number): any[] {
      return Array(n);
    }

  constructor() { }
  public screenWidth: any;
  public screenHeight: any;
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
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
