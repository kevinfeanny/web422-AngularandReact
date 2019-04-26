import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';

import { EmployeeService } from './data/employee.service';
import { Employee } from './data/employee';
@Component({
  selector: 'app-employees-component',
  templateUrl: './employees-component.component.html',
  styles: []
})
export class EmployeesComponentComponent implements OnInit, OnDestroy {

  private employees:Employee[];
  private sub:any;
  private loadingError:boolean = false;

  constructor(private e:EmployeeService) { }

  ngOnInit() {
    this.sub = this.getEmployeesSub();
  }

  getEmployeesSub():any{
    try{
      return this.e.getEmployees().subscribe(employees => this.employees = employees);
    } catch (error) {
      console.log(error);
      this.loadingError = true;
    }
  }

  ngOnDestroy(){
    if(this.sub != undefined){
      this.sub.unsubscribe();
    }
  }
}