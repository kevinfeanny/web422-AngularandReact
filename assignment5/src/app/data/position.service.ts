import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { Position } from './position';

@Injectable()
export class PositionService {
  private url = "https://rocky-journey-53032.herokuapp.com";

  constructor(private http:HttpClient) { }

  getPositions(): Observable <Position[]>{
    return this.http.get<Position[]>(`${this.url}/positions`);
  }
}
