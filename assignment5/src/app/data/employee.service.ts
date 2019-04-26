import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { Employee } from './employee';

@Injectable()
export class EmployeeService {
  private url = "https://rocky-journey-53032.herokuapp.com";

  constructor( private http:HttpClient) { }

  getEmployees(): Observable <Employee[]>{
    return this.http.get<Employee[]>(`${this.url}/employees`);
  }
}
