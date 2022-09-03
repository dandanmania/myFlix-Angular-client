import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {

  /**
   * Inject to get Movie Description from Movie Object
   * @param data Description of Movie
   */
  constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: {
        Description: string
      }
  ) { }

  ngOnInit(): void {
  }

}
