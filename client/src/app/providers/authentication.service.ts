import { LOCAL_STORAGE, WINDOW, } from '@ng-toolkit/universal';
import { Injectable, Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface Expiry {
  exp: number;
  iat: number;
}

@Injectable()
export class AuthenticationService {
  private adminToken: string;
  private userToken: string;
  public isLogged = new BehaviorSubject(false);
  public userDetail = new BehaviorSubject(null);
  public adminDetail = new BehaviorSubject(null);
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  $adminDetail = this.adminDetail.asObservable();
  $userDetail = this.userDetail.asObservable();

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private http: HttpClient, private router: Router) { }

  public saveToken(user: string, token: string): void {
    if (user === 'customer') {
      this.localStorage.setItem('logged', user);
      this.localStorage.setItem('user-token', token);
      this.userToken = token;
      this.changeState(true);
      this.localStorage.removeItem('admin-token');
      this.localStorage.removeItem('logged');
    }  else if (user === 'admin') {
      this.localStorage.setItem('logged', user);
      this.localStorage.setItem('admin-token', token);
      this.adminToken = token;
      this.localStorage.removeItem('user-token');
      this.localStorage.removeItem('logged');
    }
  }

  public getToken(type): string {
    if (type === 'customer') {
      this.userToken = this.localStorage.getItem('user-token');
      return this.userToken;
    }
    if (type === 'admin') {
      this.adminToken = this.localStorage.getItem('admin-token');
      return this.adminToken;
    }
  }

  public getExpiry(type) {
    const token = this.getToken(type);
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = this.window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public getUser(type) {
    if (this.isLoggedIn) {
      this.userDetail.next(this.getExpiry(type));
      return this.getExpiry(type);
    } else {
      return false;
    }
  }

  public isLoggedIn(type): boolean {
    const user = this.getExpiry(type);
    if (user) {
      this.changeState(user.exp > Date.now() / 1000);
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  getLoginState(type) {
    this.getExpiry(type) ? this.changeState(this.getExpiry(type).exp > Date.now() / 1000) : this.changeState(false);
    return this.isLogged;
  }

  changeState(state) {
    this.isLogged.next(state);
  }

  public customerLogout(): void {
      this.userToken = '';
      this.localStorage.removeItem('user-token');
      this.localStorage.removeItem('logged');
      this.userDetail.next(null);
      this.router.navigateByUrl('/');
      this.changeState(false);
  }

  public logout(): void {
    this.adminToken = '';
    this.localStorage.removeItem('admin-token');
    this.localStorage.removeItem('logged');
    this.router.navigateByUrl('/admin/login');
    localStorage.removeItem('adminroles');
  }
}
