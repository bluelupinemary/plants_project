import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PlantstateService } from 'src/app/services/plantstate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onSubmitValues = new EventEmitter();
  @Output() formSubmitValues : any;
  @Output() stateFormList : any[] = [];
  @Output() categoryFormList : any[] = [
    {
      "key":"BIOMASS","val": "Biomass"
    },
    {
      "key":"COAL","val": "Coal"
    },
    {
      "key":"OFSL","val": "Fossil"
    },
    {
      "key":"GAS","val": "Gas"
    },
    {
      "key":"GEOTHERMAL","val": "Geothermal"
    },
    {
      "key":"HYDRO","val": "Hydro"
    },
    {
      "key":"NONRENEWABLE","val": "Non-renewable"
    },
    {
      "key":"NUCLEAR","val": "Nuclear"
    },
    {
      "key":"OIL","val": "Oil"
    },
    {
      "key":"OTHF","val": "Other Purchased Fuel"
    },
    {
      "key":"RENEWABLE","val": "Renewable"
    },
    {
      "key":"SOLAR","val": "Solar"
    },
    {
      "key":"WIND","val": "Wind"
    },
    {
      "key":"NONHYDRO","val": "NonHydro Renewable"
    }
  ]

  constructor(private plantstateService : PlantstateService) { }

  ngOnInit(): void {
    const stateNameMap : any = {
      AL:"Alabama",
      AK:"Alaska",
      AZ:"Arizona",
      AR:"Arkansas",
      CA:"California",
      CO:"Colorado",
      CT:"Connecticut",
      DE:"Delaware",
      DC:"District of Columbia",
      FL:"Florida",
      GA:"Georgia",
      HI:"Hawaii",
      ID:"Idaho",
      IL:"Illinois",
      IN:"Indiana",
      IA:"Iowa",
      KS:"Kansas",
      KY:"Kentucky",
      LA:"Louisiana",
      ME:"Maine",
      MD:"Maryland",
      MA:"Massachusetts",
      MI:"Michigan",
      MN:"Minnesota",
      MS:"Mississippi",
      MO:"Missouri",
      MT:"Montana",
      NE:"Nebraska",
      NV:"Nevada",
      NH:"New Hampshire",
      NJ:"New Jersey",
      NM:"New Mexico",
      NY:"New York",
      NC:"North Carolina",
      ND:"North Dakota",
      OH:"Ohio",
      OK:"Oklahoma",
      OR:"Oregon",
      PA:"Pennsylvania",
      RI:"Rhode Island",
      SC:"South Carolina",
      SD:"South Dakota",
      TN:"Tennessee",
      TX:"Texas",
      UT:"Utah",
      VT:"Vermont",
      VA:"Virginia",
      WA:"Washington",
      WV:"West Virginia",
      WI:"Wisconsin",
      WY:"Wyoming"
    }
  
     this.plantstateService.getAllStates().subscribe((states)=>{

      states.forEach((state:any)=>{
        let code = state['PSTATABB'];
        let data = {
          "code": code,
          "name": stateNameMap[code]
        }
        this.stateFormList.push(data)
      })
    })
  }

  
  form = new FormGroup({
    stateForm: new FormControl(),
    categoryForm: new FormControl(),
    topNForm: new FormControl()
  });
  
  get f(){
    return this.form.controls;
  }

  submitForm(){
    this.onSubmitValues.emit(this.form.value)
  }

}
