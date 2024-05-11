import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GitHubUser } from '../GitHubUser';
import { Repository } from '../Repository';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private userCache = new Map<string, GitHubUser>();
  private repoCache = new Map<string, Repository[]>();

  private headers = new HttpHeaders({
    'Authorization': 'Bearer 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'
  });

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string): Observable<GitHubUser> {
    const cachedUser = this.userCache.get(githubUsername);

    if (cachedUser !== undefined) {
      return new Observable<GitHubUser>(observer => {
        observer.next(cachedUser);
        observer.complete();
      });
    } else {
      const userObservable = this.httpClient.get<GitHubUser>(`https://api.github.com/users/${githubUsername}`, { headers: this.headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Unknown error occurred.';
          if (error.status === 404) {
            errorMessage = 'User not found.';
          } else {
            errorMessage = error.message;
          }
          return throwError(errorMessage);
        })
      );

      // Cache the user observable for future use
      userObservable.subscribe(user => {
        this.userCache.set(githubUsername, user);
      });

      return userObservable;
    }
  }

  getRepos(githubUsername: string, page: number, per_page: number): Observable<Repository[]> {
    const cacheKey = `${githubUsername}-page:${page}-per_page:${per_page}`;
    const cachedRepos = this.repoCache.get(cacheKey);

    if (cachedRepos !== undefined) {
      return new Observable<Repository[]>(observer => {
        observer.next(cachedRepos);
        observer.complete();
      });
    } else {
      const reposObservable = this.httpClient.get<Repository[]>(`https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${per_page}`, { headers: this.headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = error.message;
          if (error.status === 404) {
            errorMessage = 'User not found.';
          } else {
            errorMessage = error.message;
          }
          return throwError(errorMessage);
        })
      );

      // Cache the repos observable for future use
      reposObservable.subscribe(repos => {
        this.repoCache.set(cacheKey, repos);
      });

      return reposObservable;
    }
  }
}
