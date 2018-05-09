import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  prevId: string = null;
  mouseEnter(id) {
    // if (id !== this.prevId) {
    //   document.getElementById(this.prevId).style.backgroundColor = null;
    // }
    if (id !== this.prevId) {
      if (this.prevId !== null) {
        document.getElementById(this.prevId).style.backgroundColor = '';
      }
    }
    document.getElementById(id).style.backgroundColor = 'rgba(23, 165, 231, 0.993)';
    this.prevId = id;
  }
  ngOnInit() {
  }

}
