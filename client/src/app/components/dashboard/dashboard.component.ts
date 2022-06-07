import { Component, OnInit, Output } from '@angular/core';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { PlantstateService } from 'src/app/services/plantstate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() plants : any[];
  @Output() isFiltered : boolean = false;
  @Output() topN : number;

  constructor(private plantstateService : PlantstateService) { }

  ngOnInit(): void {
    this.plantstateService.getAllPlants().subscribe((plants)=>{
      this.plants = plants;
    })    
  }

  ngOnChange(): void {
    
  }

  getAllPlants(){
    this.plantstateService.getAllPlants().subscribe((plants)=>{
      this.plants = plants;
    }) 
  }

  getAllPlantsByState(state:string){
    this.plantstateService.getAllPlantsByState(state).subscribe((plants)=>{
      this.plants = plants;
      this.isFiltered = true;
    })  
  }

  getTopNPlants(formValues:any){
    let n = parseInt(formValues.topNForm);
    this.plantstateService.getTopPlantsByNetGeneration(n).subscribe((plants)=>{
      this.plants = plants;
      this.isFiltered = true;
      this.topN = n;
    })  
  }

  onHeaderSubmitValues(formValues:any){
    console.log('values are here', formValues)
    //if top N is selected                                (1)fetch all top N plants from all states for all categories   /
        //if state is selected                            (2)fetch all top N plants from selected state for all categories
          //if category is selected                       (3)fetch all top N plants from selected state for selected category
          //if category is not selected                   (2)
        //if state is not selected                        (1) /
          //if category is selected                       (4)fetch all top N plants from all states for selected category
          //if category is not selected                   (1) /
    //else if top N is not selected                       (5)fetch all plants from all states for all categories /
        //if state is selected                            (6)fetch all plants from selected state for all categories/
          //if category is selected                       (7)fetch all plants from selected state for selected category
          //if category is not selected                   (6)
        //if state is not selected                        (5) /
          //if category is selected                       (8)fetch all plants from all states for selected category
          //if category is not selected                   (5) /



    

    if(formValues.topNForm!=='' || formValues.topNForm!==null){
      this.getTopNPlants(formValues);
      if(formValues.stateForm!=='' || formValues.stateForm!==null){

      }else{
        this.getTopNPlants(formValues);
        if(formValues.categoryForm!=='' || formValues.categoryForm!==null){

        }else{
          this.getTopNPlants(formValues);
        }
      }
    }else{
      this.getAllPlants();
      this.isFiltered = true;

      if(formValues.stateForm!=='' || formValues.stateForm!==null){
        this.getAllPlantsByState(formValues.stateForm)
        if(formValues.categoryForm!=='' || formValues.categoryForm!==null){

        }else{
          this.getAllPlants();
        }
      }else{
        this.getAllPlants();
        if(formValues.categoryForm!=='' || formValues.categoryForm!==null){

        }else{
          this.getAllPlants();
        }
      }
    }
  }
}
