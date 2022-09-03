import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  /**
   * Alter Router Navigation for Profile Refresh when Editing
   */
  mySubscription;
  constructor(public dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; 
    // Subscribe to router events
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick router into believing the last link wasn't loaded
        this.router.navigated = false;
      }
    })
  }
  // Unsubscribe from router events when component is destroyed
  ngOnDestroy() {
    if(this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
