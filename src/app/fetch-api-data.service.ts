import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://dandanmania-movieapi.cyclic.app/'
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  /**
   * API call to User Registration Endpoint
   * @param userDetails userDetails
   * @returns New User Object
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Api call for User Login
  /**
   * API call to User Login Endpoint
   * @param userDetails userDetails
   * @returns User Object
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    )
  }

  // Api call for Getting All Movies
  /**
   * API call to get All Movie data endpoint
   * @returns Array of All Movie Objects
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Api call for Getting All Directors
  /**
   * API call to get All Director data endpoint
   * @returns Array of All Director Objects
   */
  getAllDirectors(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Api call for Getting All Directors
  /**
   * API call to get All Genre data endpoint
   * @returns Array of All Genre Objects
   */
  getAllGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genre', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Api call for Getting One Movie (by ID)
  /**
   * API call to get a Movie Object by Movie ID
   * @param movieID Movie's ID
   * @returns Movie Object
   */
  getOneMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${movieID}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Api call for Getting Director (by Name)
  /**
   * API call to get a Director Object by their Name
   * @param name Director's Name
   * @returns Director Object
   */
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${name}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Api call for Getting Genre (by Name)
  /**
   * API call to get a Genre Object by the Genre Name
   * @param name Genre Name
   * @returns Genre Object
   */
  getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genre/${name}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Api call for Getting User (by Username) (P.S. Use this when getting Favorites)
  /**
   * API call to get a User by Username
   * @param username Username
   * @returns User Object
   */
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Api call for Favoriting a Movie
  /**
   * API call to add a movie to user's Favorites
   * @param movieID Movie's ID
   * @returns Added Success Message Text
   */
  addFavorite(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/movies/${movieID}`, {}, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      responseType: 'text'
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Api call for Editing User
  /**
   * API call to edit a User's Info
   * @param submission Updated User Info
   * @returns Updated User Object
   */
  editUser(submission: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, submission, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Api call for Deleting User
  /**
   * API call to delete a user
   * @param username Username
   * @returns Delete User Success Message
   */
  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      responseType: 'text'
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Api call for Deleting Favorite Movie
  /**
   * API call to delete/remove a movie from user's favorites
   * @param username Username
   * @param movieID Movie's ID
   * @returns Delete Favorite Movie Success Message
   */
  deleteFavorite(username: any, movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieID}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      responseType: 'text'
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * Error Handling
   * @param error Error
   * @returns Error Message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }

  /**
   * Extracts response data from 
   * @param res response
   * @returns Response Body or Empty Object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}