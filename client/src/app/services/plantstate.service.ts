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

  getAllPlantsByCategory(category:string): Observable<any>{
    return this.http.get(`${this.baseUrl}/plants/all/${category}`);
  }

  getAllPlantsByStateByCategory(category:string, state:string): Observable<any>{
    return this.http.get(`${this.baseUrl}/plants/${state}/${category}`);
  }

  getTopPlantsByNetGeneration(n : number): Observable<any>{
    // return this.http.get(`${this.baseUrl}/plants/${state.code}`);
    return this.http.get(`${this.baseUrl}/generation/${n}`);
  }

  getTopPlantsByNetGenerationByState(state: string,n : number): Observable<any>{
    return this.http.get(`${this.baseUrl}/generation/${n}/${state}`);
  }

  getTopPlantsByNetGenerationByCategory(category: string,n : number): Observable<any>{
    return this.http.get(`${this.baseUrl}/generation/${n}/all/${category}`);
  }

  getTopPlantsByNetGenerationByStateByCategory(state:string,category: string,n : number): Observable<any>{
    return this.http.get(`${this.baseUrl}/generation/${n}/${state}/${category}`);
  }
  
  getPlantDetails(id:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/plant/${id}`);
  }

  getPlantDetailsByType(id:any,type:string): Observable<any>{
    return this.http.get(`${this.baseUrl}/plant/${id}/${type}`);
  }

  // getStates(): Observable<any>{
  //   return this.http.get(`${baseUrl}/${id}`);
  // }
}
