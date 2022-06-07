import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantstateService {
  private baseUrl = 'http://localhost:8080/api/v1/states';


  constructor(private http:HttpClient) { }

  getAllStates(): Observable<any>{
    return this.http.get(`${this.baseUrl}/`);
  }

  getAllPlants(): Observable<any>{
    return this.http.get(`${this.baseUrl}/plants`);
  }

  getAllPlantsByState(state:string): Observable<any>{
    return this.http.get(`${this.baseUrl}/plants/${state}`);
  }

  getTopPlantsByNetGeneration(n : number): Observable<any>{
    // return this.http.get(`${this.baseUrl}/plants/${state.code}`);
    return this.http.get(`${this.baseUrl}/generation/${n}`);
  }

  // getStates(): Observable<any>{
  //   return this.http.get(`${baseUrl}/${id}`);
  // }
}
