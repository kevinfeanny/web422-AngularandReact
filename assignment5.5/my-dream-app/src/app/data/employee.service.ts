import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

import { Observable } from "rxjs";
import { Employee } from './employee';

@Injectable()
export class EmployeeService {
  private url = "https://pure-cove-37992.herokuapp.com";

  constructor( private http:HttpClient) { }

  getEmployees(): Observable <Employee[]>{
    return this.http.get<Employee[]>(`${this.url}/employees`);
  }
}