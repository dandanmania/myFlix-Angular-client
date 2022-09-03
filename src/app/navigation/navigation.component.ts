import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: string | null = '';
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
  }

  /**
   * Log user out
   */
  triggerLogOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  /**
   * Route to Profile Page
   */
  toProfile(): void {
    this.router.navigate(['profile'])
  }

  /**
   * Route to Movies Page
   */
  toHome(): void {
    this.router.navigate(['movies'])
  }
}
