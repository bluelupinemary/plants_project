import { Component, OnInit } from '@angular/core';
import { PlantstateService } from 'src/app/services/plantstate.service';

@Component({
  selector: 'app-mapdetails',
  templateUrl: './mapdetails.component.html',
  styleUrls: ['./mapdetails.component.css']
})
export class MapdetailsComponent implements OnInit {
  generations: any = {};
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

  ngOnInit(): void {
    this.plantstateService.getTopPlantsByNetGeneration(5).subscribe((generations)=>{
      this.generations = generations;

      console.log("generations", generations["coal"])
    });
  }

}
