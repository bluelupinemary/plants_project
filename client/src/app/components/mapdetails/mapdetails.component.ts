import { Component, OnInit, Input, Output } from '@angular/core';
import { PlantstateService } from 'src/app/services/plantstate.service';

@Component({
  selector: 'app-mapdetails',
  templateUrl: './mapdetails.component.html',
  styleUrls: ['./mapdetails.component.css']
})
export class MapdetailsComponent implements OnInit {
  @Input() plantId : any;
  plantDetails: any;
  categoryFormList : any[] = [
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
    }
  ]

  

  constructor(private plantstateService: PlantstateService) { }

  ngOnChanges():void {
    if(this.plantId && this.plantId!==null && this.plantId !=''){
        this.plantstateService.getPlantDetails(this.plantId).subscribe((plantDetails)=>{
          this.plantDetails = plantDetails;
        });
    }
   
  }

  ngOnInit(): void {
    }

}
