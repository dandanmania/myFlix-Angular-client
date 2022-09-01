import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  directors: any[] = [];
  genres: any[] = [];
  faves: any[] = [];
  user: any = {};
  
  constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
    this.getDirectors();
    this.getGenres();
    this.getFaves();
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '800px',
    });
  }

  openDirectorDialog(name: string, description: string): void{
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '800px'
    })
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Description: description
      },
      width: '800px'
    })
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      //console.log(this.movies);
      return this.movies;
    })
  }

  getDirectors(): void {
    this.fetchApiData.getAllDirectors().subscribe((resp: any) => {
      this.directors = resp;
      //console.log(this.directors);
      return this.directors;
    })
  }

  getGenres(): void {
    this.fetchApiData.getAllGenres().subscribe((resp: any) => {
      this.genres = resp;
      //console.log(this.genres);
      return this.genres;
    })
  }

  getFaves(): void {
    let username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.faves = resp.FavoriteMovies;
      this.user = resp;
      return this.faves;
    })
  }

  faveCheck(id: string): boolean {
    return this.faves.includes(id)
  }

  addFave(id: string): void {
    this.fetchApiData.addFavorite(id).subscribe((resp: any) => {
      this.getFaves();
      //console.log(this.faves)
    })
  }

  deleteFave(id: string): void {
    let username = localStorage.getItem('user')
    this.fetchApiData.deleteFavorite(username, id).subscribe((resp: any) => {
      this.getFaves();
      //console.log(this.faves);
    })
  }

}
