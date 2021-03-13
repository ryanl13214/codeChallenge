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
    // odd name, the frontend shouldn't care what is beneath the API (eg if it was re-written using a graph db the JS wouldn't need to care) it's just sending standard HTTP requests. HttpService or ApiService would make more sense to me.
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

    MAX_ITEMS_PER_PAGE: number = 4;

    currFocus: any = 1;
    currPage: any = 0;
    isEdit: any = false;
    isAdd: any = false;
    items: any = [];
    test: any = [];
    //mixing a bit between naming conventions, I don't care too much about what convention is used
    //if it is at least self consistent. CitySort and premiumSort, mixing casing.
    CitySort: string = '';
    premiumSort: string = '';
    // variables used for editing current policy
    selectedValue: string;
    CustomerName: string = '';
    Policytype: string = '';
    Insurer: string = '';
    Premium: string = '';
    Street: string = '';
    City: string = '';
    // for adding new items
    NewCustomer: any = {
        Customer_Name: "",
        Customer_street_address: "",
        Customer_city: ""
    };
    NewPolicy: any = {
        premium: 0,
        Customer_Customer_Name: "",
        Insurer_Insurer_Name: "",
        Client_Client_Name: "Achme Broker Ltd",
        policy_type_policy_type: ""
    };
    newPolicy_type: string = '';
    newInsurer: string = "";
    // for use in the lsit list controls how many items are displayed at once max of 4 but
    // at the end of the list displays less to make it clearer when the list eeds.

    // odd method name this, I'd recommend naming it something that states the intent - side note is it even used?
    arrayOne(n: number): any[]
    {
        // I would put the number 4 to a constant name eg MAX_ITEMS_PER_PAGE. Generally magic numbers should be avoided 
        // https://codeburst.io/software-anti-patterns-magic-numbers-7bc484f40544

        
        // this logic looks a bit clumsy, I think it could be refactored
        if((this.currPage * this.MAX_ITEMS_PER_PAGE) > this.items.length)
        {
            return Array(Math.abs(this.currPage * this.MAX_ITEMS_PER_PAGE - this.items.length));
        }
        // you don't need the else here you return above so if the code executes to here it already is else

        var tmp = Math.abs(this.currPage * this.MAX_ITEMS_PER_PAGE - this.items.length);
        // terrinary instead?
        return (tmp > this.MAX_ITEMS_PER_PAGE) ? [this.MAX_ITEMS_PER_PAGE] : [Math.abs(this.currPage *this.MAX_ITEMS_PER_PAGE - this.items.length)];
        
    }
    setFocused(a)
    {
        this.currFocus = a;
    }

    setElementDisplayStyle(elementName: string, displayStyle: string){
        document.getElementById(elementName).style.display = displayStyle;
    }

showHideAdd(i){

    // indentation seems to have changed here?
  // why set the a variable that isn't ever used? Doesn't angular have a show/hide element, surely it does
  
  // this could be refactored - an array of items that are looped over. Since the same bit of code is repeated I'd be tempted to pull it into
  // a shorthand method
  this.setElementDisplayStyle("Policy_Type","none");
  this.setElementDisplayStyle("Policy","none");
  this.setElementDisplayStyle("Customer","none");
  this.setElementDisplayStyle("Insurer","none");

 
  // if i can only be one value why bother checking other values if 1 is equal? should be a loop over an array but 
  // even if not, why not a switch?

  switch(i) {
    case 1:
        this.setElementDisplayStyle("Policy_Type","inline-block");
        break;
    case 2:
        this.setElementDisplayStyle("Policy","inline-block");
        break;
    case 3:
        this.setElementDisplayStyle("Customer","inline-block");
        break;
    case 4:
        this.setElementDisplayStyle("Insurer","inline-block");
        break;
  }
}




    // function name? even if it's getPremiumTag it doesn't make sense as it returns a string - not sure
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
            // same as above, variable not required
            this.setElementDisplayStyle("up", "inline-block");
            // aaaaaaaand repeat
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
    SavePolicyType()
    {
        console.log("SavePolicyType");
        this.sqlapi.SavePolicyType(this.newPolicy_type);
    }
    SaveCustomer()
    {
        console.log("SaveCustomer");
        this.sqlapi.SaveCustomer(this.NewCustomer.Customer_Name, this.NewCustomer.Customer_street_address, this.NewCustomer.Customer_city);
    }
    SavePolicy()
    {
        console.log("SavePolicy");
        this.sqlapi.SavePolicy(this.NewPolicy.premium, this.NewPolicy.Customer_Customer_Name, this.NewPolicy.Insurer_Insurer_Name, this.NewPolicy.Client_Client_Name, this.NewPolicy.policy_type_policy_type);
    }
    SaveInsurer()
    {
        console.log("SaveInsurer");
        this.sqlapi.SaveInsurer(this.newInsurer);
    }
    sortCity()
    {
        if(this.CitySort == '')
        {
            this.sortByAlphabet('asc');
            this.CitySort = 'asc';
            // you know what I am going to say here ;)
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
            // magic numbers - sorting is a well understood area, I am sure angular will have this otherwise there are libraries like lodash
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
            // magic numbers
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
            this.items.sort(function(a, b)
            {
                return a.customer_address_city.length - b.customer_address_city.length;
            });
        }
        else
        {
            this.items.sort(function(a, b)
            {
                return b.customer_address_city.length - a.customer_address_city.length;
            });
        }
        console.log(this.items);
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
        if(this.CustomerName == "")
        {
            this.CustomerName = this.items[this.currFocus].Customer_Customer_Name;
        }
        if(this.Premium == "")
        {
            this.Premium = this.items[this.currFocus].premium;
        }
        if(this.CustomerName == "")
        {
            this.CustomerName = this.items[this.currFocus].Customer_Customer_Name;
        }
        if(this.Insurer == "")
        {
            this.Insurer = this.items[this.currFocus].Insurer_Insurer_Name;
        }
        if(this.Policytype == "")
        {
            this.Policytype = this.items[this.currFocus].policy_type_policy_type;
        }
        this.sqlapi.updatePolicy(pk, this.CustomerName, this.Policytype, this.Insurer, this.Premium, this.Street, this.City, addresspk);
    }
    AddItem()
    {
        if(!this.isAdd)
        { // add focused check
            // again
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
            var mainDisplay = document.getElementById("AddItem").style.display = "none";
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
