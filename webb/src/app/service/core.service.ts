import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

  handleError(error: Response | any) {
    let errMsg: string;
    errMsg = `${error.status} - ${error.statusText || ""}`;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
