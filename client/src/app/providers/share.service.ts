import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

interface TokenResponse {
  token: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private loginDisplay = new Subject<any>();

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getData(url) {
    return this.http.get(url).pipe(
      map((data: TokenResponse) => {
        return data;
      })
    );
  }

  postData(url, data) {
    return this.http.post(url, data).pipe(
      map((data: TokenResponse) => {
        return data;
      })
    );
  }

  update(url, data) {
    return this.http.put(url, data);
  }

  delete(url) {
    return this.http.delete(url);
  }

  getLoginModal(): Observable<any> {
    return this.loginDisplay.asObservable();
  }

  setLoginModal(val) {
    val ?  document.body.classList.add('modalopen') : document.body.classList.remove('modalopen');
    this.loginDisplay.next(val);
  }

}
