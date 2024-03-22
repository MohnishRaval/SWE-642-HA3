import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, forkJoin, from, of, throwError } from 'rxjs';
import { catchError, map, retry, switchMap, take } from 'rxjs/operators';
import { IPost, FormPostModel } from '../models/PostModel';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private formPayloadSubject = new Subject<any>();
  public formPayload$ = this.formPayloadSubject.asObservable();
  private formAPISucessSubject = new Subject<boolean>();
  public formAPISucess$ = this.formAPISucessSubject.asObservable();

  constructor(public router: Router, private http: HttpClient) {}
  postsURL = 'https://jsonplaceholder.typicode.com/todos';
  usersURL = 'https://jsonplaceholder.typicode.com/users';
  errorURL = 'https://mock.codes/';
  currentActivatedRoute = 'surveyform';
  pageSize = 20;

  //FORM Methods
  saveFormDetails(formModel: FormPostModel) {
    return this.http
      .post<FormPostModel>(`${environment.API_URL}/form/submit`, formModel)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Some Error Occurred';
          if (error.status === 400) {
            errorMessage = 'Invalid Form Data';
          } else if (error.status === 500) {
            errorMessage = 'Server Error Occurred';
          }
          return throwError(errorMessage);
        })
      );
  }

  fetchFormDetails() {
    return this.http.get(`${environment.API_URL}/form/viewAllRecords`);
  }

  setFormPayload(formData: any) {
    this.formPayloadSubject.next(formData);
  }

  //Form API Status
  formAPIStatus(success: boolean) {
    this.formAPISucessSubject.next(success);
  }

  //RXJS-Playground
  getTodos() {
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

    this.http
      .get<any[]>(usersUrl)
      .pipe(
        switchMap((users) => {
          // For each user, make a separate HTTP request to get their posts
          const userPostsRequests = users.map((user) =>
            this.http.get<any[]>(`${postsUrl}?userId=${user.id}`)
          );
          // Combine the results of all requests into a single observable
          return forkJoin(userPostsRequests).pipe(
            map((postsByUser) => {
              // Combine the user data with their posts
              const usersWithPosts = users.map((user, index) => ({
                ...user,
                posts: postsByUser[index].map((posts) => {
                  const { userId, ...others } = posts;
                  return others;
                }),
              }));
              return usersWithPosts;
            })
          );
        })
      )
      .subscribe((usersWithPosts) => {
        // Process the data here
        console.log(usersWithPosts);
      });
  }

  //RXJS-Pagination-Challenge
  getPosts(pageNumber: number, pageSize: number): Observable<IPost[]> {
    const postsURL = 'https://jsonplaceholder.typicode.com/posts';
    const startIndex = (pageNumber - 1) * pageSize;

    const params = {
      _start: startIndex.toString(),
      _limit: pageSize.toString(),
    };

    return this.http.get<IPost[]>(postsURL, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error occured', error);
        return throwError(error);
      })
    );
  }

  //RXJS-CatchError
  mockErrorFunction() {
    return this.http.get(this.errorURL).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        return of(error);
      })
    );
  }
}
