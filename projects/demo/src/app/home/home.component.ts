import { Component, OnInit } from '@angular/core';
import readme from "../../../../../README.md" // substitute this path with your README.md file path


@Component({
  selector: 'lcu-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
//  public readMe: any = readme;


  constructor(
  ) { }

  public ngOnInit(): void {
    //   console.log("readMe = ", this.readMe);
    
  }

 

 

}
