import { Component, OnInit } from '@angular/core';
import { PlantstateService } from 'src/app/services/plantstate.service';

@Component({
  selector: 'app-topranking',
  templateUrl: './topranking.component.html',
  styleUrls: ['./topranking.component.css']
})
export class ToprankingComponent implements OnInit {

  constructor(private plantstateService : PlantstateService) { }

  ngOnInit(): void {

    
  }

}
