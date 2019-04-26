import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Position } from '../data/position';
import { PositionService } from '../data/position.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  private positions:Position[];
  private sub:any;
  private loadingError:boolean = false;

  constructor(private p:PositionService) { }

  ngOnInit() {
    this.sub = this.getPositionsSub();
  }

  getPositionsSub():any{
    try {
      return this.p.getPositions().subscribe(positions => this.positions = positions);
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