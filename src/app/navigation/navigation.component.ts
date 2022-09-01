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

  triggerLogOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  toProfile(): void {
    this.router.navigate(['profile'])
  }

  toHome(): void {
    this.router.navigate(['movies'])
  }
}
