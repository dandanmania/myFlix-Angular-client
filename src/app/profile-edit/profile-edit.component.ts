import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteUserWarningComponent } from '../delete-user-warning/delete-user-warning.component';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Username: string,
    },
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log(result)
      this.dialogRef.close();
      this.snackBar.open('Update successful!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['profile']);
    })
  }

  openDeleteUserDialog(): void {
    this.dialogRef.close()
    this.dialog.open(DeleteUserWarningComponent, {
      width: '500px'
    })
  }

}
