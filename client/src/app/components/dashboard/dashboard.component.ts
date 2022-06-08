import { ThisReceiver } from '@angular/compiler';
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
  @Output() hasState: boolean = false;
  @Output() hasCategory: boolean = false;
  @Output() topN : any;
  @Output() plantId : any;

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
      this.topN = null;

    }) 
  }

  getAllPlantsByState(state:string){
    this.plantstateService.getAllPlantsByState(state).subscribe((plants)=>{
      this.plants = plants;
      this.isFiltered = true;
    })  
  }

  getAllPlantsByCategory(category:string){
    this.plantstateService.getAllPlantsByCategory(category).subscribe((plants)=>{
      this.plants = plants;
      this.hasCategory = true;
    })  
  }

  getAllPlantsByStateByCategory(category:string, state:string){
    this.plantstateService.getAllPlantsByStateByCategory(category, state).subscribe((plants)=>{
      this.plants = plants;
      this.hasState = true;
      this.isFiltered = true;
    })  
  }

  getTopNPlants(n:number){
    this.plantstateService.getTopPlantsByNetGeneration(n).subscribe((plants)=>{
      this.plants = plants;
      this.isFiltered = true;
      this.topN = n;
    })  
  }

  getTopNPlantsByState(state:string, n:any){
    this.plantstateService.getTopPlantsByNetGenerationByState(state, n).subscribe((plants)=>{
      this.plants = plants;
      this.isFiltered = true;
      this.hasState = true;
      this.topN = n;
    })  
  }

  getTopNPlantsByCategory(category:string, n:any){
    this.plantstateService.getTopPlantsByNetGenerationByCategory(category, n).subscribe((plants)=>{
      this.plants = plants;
      this.isFiltered = true;
      this.topN = n;
    })  
  }

  getTopNPlantsByStateByCategory(state:string, category:string, n:any){
    console.log(state, category, n)
    n = parseInt(n);
    this.plantstateService.getTopPlantsByNetGenerationByStateByCategory(state,category,n).subscribe((plants)=>{
      this.plants = plants;
      console.log('plants after fetch', this.plants)
      this.isFiltered = true;
      this.hasState = true;
      this.topN = n;
    })  
  }

  onHeaderSubmitValues(formValues:any){
    //if top N is selected                                (1)fetch all top N plants from all states for all categories   /
        //if state is selected                            (2)fetch all top N plants from selected state for all categories /
          //if category is selected                       (3)fetch all top N plants from selected state for selected category/
          //if category is not selected                   (2)/
        //if state is not selected                        (1) /
          //if category is selected                       (4)fetch all top N plants from all states for selected category
          //if category is not selected                   (1) /
    //else if top N is not selected                       (5)fetch all plants from all states for all categories /
        //if state is selected                            (6)fetch all plants from selected state for all categories/
          //if category is selected                       (7)fetch all plants from selected state for selected category
          //if category is not selected                   (6)/ 
        //if state is not selected                        (5) /
          //if category is selected                       (8)fetch all plants from all states for selected category
          //if category is not selected                   (5) /
    
    

    if(formValues.topNForm!=='' && formValues.topNForm!==null){
      if(formValues.stateForm!=='' && formValues.stateForm!==null && formValues.stateForm!=='null'){
        if(formValues.categoryForm!=='' && formValues.categoryForm!==null && formValues.categoryForm!=='null'){
          this.getTopNPlantsByStateByCategory(formValues.stateForm, formValues.categoryForm, formValues.topNForm);
          console.log("all top per state per category")
        }else{
          this.getTopNPlantsByState(formValues.stateForm, formValues.topNForm);
          console.log("top in state all category")
          // this.isFiltered = true;
        }
      }else{
        if(formValues.categoryForm!=='' && formValues.categoryForm!==null  && formValues.categoryForm!=='null'){
          this.getTopNPlantsByCategory(formValues.categoryForm, formValues.topNForm);
          console.log("all top all state per category")
        }else{
          this.getTopNPlants(formValues.topNForm);
          console.log("all top all state all category")
        }
      }
    }else{
      
      if(formValues.stateForm!=='' && formValues.stateForm!==null   && formValues.stateForm!=='null'){
        if(formValues.categoryForm!=='' && formValues.categoryForm!==null   && formValues.categoryForm!=='null'){
          this.getAllPlantsByStateByCategory(formValues.categoryForm,formValues.stateForm)
          console.log("all per state per category")
        }else{
          this.getAllPlantsByState(formValues.stateForm)
          console.log("all per state all category")
        }
      }else{
        if(formValues.categoryForm!=='' && formValues.categoryForm!==null  && formValues.categoryForm!=='null'){
          this.getAllPlantsByCategory(formValues.categoryForm);
          console.log("all state per category")
        }else{
          this.getAllPlants();
          console.log("all state category")
         
        }
      }
    }
    this.isFiltered = true;
  }


  showPlantDetails(plantId: any){
    console.log('event in dashboard', plantId)
    this.plantId = plantId;
  }
}
