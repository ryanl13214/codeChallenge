import { Component, OnInit , HostListener} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

currPage:Number= 0;
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



  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
}
