import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends MovieCardComponent implements OnInit {

  constructor(fetchApiData: UserRegistrationService, dialog: MatDialog) {
    super(fetchApiData, dialog);
  }

  ngOnInIt(): void {}

  /**
   * Opens Profile Edit Dialog with Username data (for Display)
   * @param username Username
   */
  openProfileEdit(username: string): void {
    this.dialog.open(ProfileEditComponent, {
      data: {
        Username: username
      },
      width: '500px'
    })
  }

}
