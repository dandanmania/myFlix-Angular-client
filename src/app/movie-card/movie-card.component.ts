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

  /**
   * Open Genre Dialog
   * @param name Genre Name
   * @param description Genre Description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '800px',
    });
  }

  /**
   * Open Director Dialog
   * @param name Director Name
   * @param description Director Description
   */
  openDirectorDialog(name: string, description: string): void{
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '800px'
    })
  }

  /**
   * Open Synopsis Dialog
   * @param description Movie Description
   */
  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Description: description
      },
      width: '800px'
    })
  }

  /**
   * Get All Movies Array
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    })
  }

  /**
   * Get All Directors Array
   */
  getDirectors(): void {
    this.fetchApiData.getAllDirectors().subscribe((resp: any) => {
      this.directors = resp;
      return this.directors;
    })
  }

  /**
   * Get All Genres Array
   */
  getGenres(): void {
    this.fetchApiData.getAllGenres().subscribe((resp: any) => {
      this.genres = resp;
      return this.genres;
    })
  }

  /**
   * Get User Favorites Array and User Object
   */
  getFaves(): void {
    let username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.faves = resp.FavoriteMovies;
      this.user = resp;
      return this.faves;
    })
  }

  /**
   * Check if Favorites is included in the User Favorites Array
   * @param id Movie ID
   * @returns Boolean
   */
  faveCheck(id: string): boolean {
    return this.faves.includes(id)
  }

  /**
   * Add Movie to User Favorites
   * @param id Movie ID
   */
  addFave(id: string): void {
    this.fetchApiData.addFavorite(id).subscribe((resp: any) => {
      this.getFaves();
    })
  }

  /**
   * Remove Movie from User Favorites
   * @param id Movie ID
   */
  deleteFave(id: string): void {
    let username = localStorage.getItem('user')
    this.fetchApiData.deleteFavorite(username, id).subscribe((resp: any) => {
      this.getFaves();
      //console.log(this.faves);
    })
  }
}
