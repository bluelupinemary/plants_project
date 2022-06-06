import { Component, OnInit } from '@angular/core';
import { PlantstateService } from 'src/app/services/plantstate.service';

@Component({
  selector: 'app-mapdetails',
  templateUrl: './mapdetails.component.html',
  styleUrls: ['./mapdetails.component.css']
})
export class MapdetailsComponent implements OnInit {
  generations: any = {};
  titleGenerationsMap : Object = {
    biomass: "Biomass",
    coal: "Coal",
    fossil: "Fossil",
    gas: "Gas",
    geothermal: "Geothermal",
    hydro: "Hydro",
    nonrenewable: "Non-renewable",
    nuclear: "Nuclear",
    oil: "Oil",
    purchasedfuel: "Other Purchased Fuel",
    renewable: "Renewable",
    solar: "Solar",
    wind: "Wind"
  }

  

  constructor(private plantstateService: PlantstateService) { }

  ngOnInit(): void {
    this.plantstateService.getTopPlantsByNetGeneration(5).subscribe((generations)=>{
      this.generations = generations;

      console.log("generations", generations["coal"])
    });
  }

}
