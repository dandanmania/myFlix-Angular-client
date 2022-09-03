import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-delete-user-warning',
  templateUrl: './delete-user-warning.component.html',
  styleUrls: ['./delete-user-warning.component.scss']
})
export class DeleteUserWarningComponent implements OnInit {

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteUserWarningComponent>,
    public snackBar: MatSnackBar,  
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Close Dialog
   */
  closeDialog(): void{
    this.dialogRef.close()
  }

  /**
   * Delete User
   */
  deleteUser(): void {
    let username = localStorage.getItem('user')
    this.fetchApiData.deleteUser(username).subscribe((result) => {
      console.log(result)
      localStorage.clear()
      this.dialogRef.close()
      this.snackBar.open('User Deleted', 'OK', {
        duration: 2000
      });
      this.router.navigate(['welcome'])
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    })
  }

}
