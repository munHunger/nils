import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";

@Injectable()
export class CoreService {
  constructor(private http: HttpClient) {}

  public getIK(any): Observable<any> {
    return this.http.post<any>(environment.core.url + "/ik", any).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  public step(): Observable<any> {
    return this.http.get<any>(environment.core.url + "/path/step").pipe(
      map((data: any) => {
        return data;
      }),
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  public position(pos): Observable<any> {
    return this.http.post<any>(environment.core.url + "/position", pos).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  public addPath(points): Observable<any> {
    return this.http.post<any>(environment.core.url + "/path", points).pipe(
      map(data => data),
      catchError(error => this.handleError(error))
    );
  }

  public getBezier(points): Observable<any> {
    return this.http
      .post<any>(environment.core.url + "/path/bezier", points)
      .pipe(
        map(data => data),
        catchError(error => this.handleError(error))
      );
  }

  handleError(error: Response | any) {
    let errMsg: string;
    errMsg = `${error.status} - ${error.statusText || ""}`;
    console.error(errMsg);
    return throwError(errMsg);
  }
}
