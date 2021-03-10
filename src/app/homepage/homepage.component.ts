import
{
    Component,
    OnInit,
    HostListener
}
from '@angular/core';
import
{
    FormControl
}
from '@angular/forms';
import
{
    SqlapiService
}
from '../sqlapi.service';
@Component(
{
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit
{
    currFocus: any = 1;
    currPage: any = 0;
    isEdit: any = false;
    isAdd: any = false;
    items: any = [];
    test: any = [];
CitySort: string = '';
    premiumSort: string = '';
    // variables used for editing current policy

    CustomerName: string = '';
    Policytype: string = '';
    Insurer: string = '';
    Premium: string = '';
    Street: string = '';
    City: string = '';



// for adding new items
NewCustomer: any = {
Customer_Name:"",
Customer_street_address:"",
Customer_city:""
};

NewPolicy: any = {
premium:0,
Customer_Customer_Name:"",
Insurer_Insurer_Name:"" ,
Client_Client_Name:"Achme Broker Ltd",
policy_type_policy_type:""
};

newPolicy_type: string = '';

newInsurer: string = " sdfsdf";




    // for use in the lsit list controls how many items are displayed at once max of 4 but
    // at the end of the list displays less to make it clearer when the list eeds.
    arrayOne(n: number): any[]
    {
        if((this.currPage * 4) > this.items.length)
        {
            return Array(Math.abs(this.currPage * 4 - this.items.length));
        }
        else
        {
            var tmp = Math.abs(this.currPage * 4 - this.items.length);
            if(tmp > 4)
            {
                tmp = 4;
            }
            return Array(tmp);
        }
    }
    setFocused(a)
    {
        this.currFocus = a;
    }
    gerPremiumImg()
    {
        if(this.premiumSort == '')
        {}
        else if(this.premiumSort == 'asc')
        {
            return "100px";
        }
        else
        {
            return "100px";
        }
    }
    sortPremium()
    {
        if(this.premiumSort == '')
        {
            this.sortByPremium('asc');
            this.premiumSort = 'asc';
            var mainDisplay = document.getElementById("up").style.display = "inline-block";
            var mainDisplay = document.getElementById("down").style.display = "none";
            var mainDisplay = document.getElementById("net").style.display = "none";
        }
        else if(this.premiumSort == 'asc')
        {
            this.premiumSort = 'dec';
            this.sortByPremium('dec');
            var mainDisplay = document.getElementById("up").style.display = "none";
            var mainDisplay = document.getElementById("down").style.display = "inline-block";
            var mainDisplay = document.getElementById("net").style.display = "none";
        }
        else
        {
            this.premiumSort = '';
            var mainDisplay = document.getElementById("up").style.display = "none";
            var mainDisplay = document.getElementById("down").style.display = "none";
            var mainDisplay = document.getElementById("net").style.display = "inline-block";
        }
    }




SavePolicyType(){
  console.log("SavePolicyType");
  this.sqlapi.SavePolicyType(this.newPolicy_type );
}
SaveCustomer(){
    console.log("SaveCustomer");
  this.sqlapi.SaveCustomer(this.NewCustomer.Customer_Name ,   this.NewCustomer.Customer_street_address ,     this.NewCustomer.Customer_city      );
}

SavePolicy(){
    console.log("SavePolicy");
  this.sqlapi.SavePolicy(this.NewPolicy.premium,this.NewPolicy.Customer_Customer_Name,this.NewPolicy.Insurer_Insurer_Name,this.NewPolicy.Client_Client_Name,this.NewPolicy.policy_type_policy_type);
}
SaveInsurer(){
    console.log("SaveInsurer");
  this.sqlapi.SaveInsurer(this.newInsurer);
}








    sortCity()

    {
        if(this.CitySort == '')
        {
            this.sortByAlphabet('asc');
            this.CitySort = 'asc';
            var mainDisplay = document.getElementById("upc").style.display = "inline-block";
            var mainDisplay = document.getElementById("downc").style.display = "none";
            var mainDisplay = document.getElementById("netc").style.display = "none";
        }
        else if(this.CitySort == 'asc')
        {
            this.CitySort = 'dec';
            this.sortByAlphabet('dec');
            var mainDisplay = document.getElementById("upc").style.display = "none";
            var mainDisplay = document.getElementById("downc").style.display = "inline-block";
            var mainDisplay = document.getElementById("netc").style.display = "none";
        }
        else
        {
            this.CitySort = '';
            var mainDisplay = document.getElementById("upc").style.display = "none";
            var mainDisplay = document.getElementById("downc").style.display = "none";
            var mainDisplay = document.getElementById("netc").style.display = "inline-block";
        }
    }
    sortByPremium(direction)
    {
        if(direction == "asc")
        {
            for(let i = 0; i < 4; i++)
            {
                for(let j = 0; j < 4; j++)
                {
                    var a = Number(this.items[i].premium);
                    var b = Number(this.items[j].premium);
                    console.log(a, " is bigger than ", b, a > b);
                    if(a < b)
                    {
                        let temp = this.items[i];
                        this.items[i] = this.items[j];
                        this.items[j] = temp;
                    }
                }
            }
        }
        if(direction == "dec")
        {
            for(let i = 0; i < 4; i++)
            {
                for(let j = 0; j < 4; j++)
                {
                    var a = Number(this.items[i].premium);
                    var b = Number(this.items[j].premium);
                    console.log(a, " is bigger than ", b, a > b);
                    if(a > b)
                    {
                        let temp = this.items[i];
                        this.items[i] = this.items[j];
                        this.items[j] = temp;
                    }
                }
            }
        }
        console.log(JSON.stringify(this.items));
    }

    sortByAlphabet(direction)
    {
      if(direction == "asc")
      {

      this.items.sort(function (a, b) {
       return a.customer_address_city.length - b.customer_address_city.length;
     });
}else{
  this.items.sort(function (a, b) {
   return b.customer_address_city.length - a.customer_address_city.length;
 });
}



   console.log(  this.items);
    }

    constructor(private sqlapi: SqlapiService)
    {}
    public screenWidth: any;
    public screenHeight: any;
    ngOnInit(): void
    {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.sqlapi.getAllPolicys().subscribe((res: any) =>
        {
            this.items = res;
        }); // gets the user ip address
    }
    changepage(i)
    {
        if(i == 1 && this.currPage > 0)
        {
            this.currPage = this.currPage - 1;
        }
        if(i == 2 && this.currPage < (this.items.length / 4))
        {
            this.currPage = this.currPage + 1;
        }
    }
    Save()
    {
        var pk = this.items[this.currFocus].PolicyPK;
        var addresspk = this.items[this.currFocus].address_PK;
        this.sqlapi.updatePolicy(pk, this.CustomerName, this.Policytype, this.Insurer, this.Premium, this.Street, this.City, addresspk);
    }
    AddItem()
    {
        if(!this.isAdd)
        { // add focused check
            var mainDisplay = document.getElementById("Display").style.display = "none";
            var mainDisplay = document.getElementById("AddItem").style.display = "block";
            var mainDisplay = document.getElementById("EditItem").style.display = "none";
        }
        else
        {
            var mainDisplay = document.getElementById("Display").style.display = "block";
            var mainDisplay = document.getElementById("EditItem").style.display = "none";
            var mainDisplay = document.getElementById("AddItem").style.display = "none";
        }
        this.isAdd = !this.isAdd;
    }
    alternateBetweenEditAndDisplay()
    {
        if(!this.isEdit)
        { // add focused check
            var mainDisplay = document.getElementById("Display").style.display = "none";
            var mainDisplay = document.getElementById("AddItem").style.display = "none";
            var mainDisplay = document.getElementById("EditItem").style.display = "block";
        }
        else
        {
            var mainDisplay = document.getElementById("Display").style.display = "block";
            var mainDisplay = document.getElementById("EditItem").style.display = "none";
        }
        this.isEdit = !this.isEdit;
    }
    @HostListener('window:resize', ['$event'])
    onResize(event)
    {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
    }
}
