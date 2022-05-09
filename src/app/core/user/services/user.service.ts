import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService, CREATE_USER, LOG_IN_USER } from '../../api';
import { AuthData } from '../models/authData.model';
import { User } from '../models/user.model';
@Injectable()
export class UserService {
  // TODO export in state
  private tokenTimer: any; // NodeJS.Timer

  constructor(private apiService: ApiService) {}

  signUp(username: string, password: string): Observable<any> {
    const user: User = new User(username, password);
    return this.apiService.apiCall(CREATE_USER, { user });
  }

  login(username: string, password: string): Observable<AuthData> {
    const user: User = new User(username, password);
    return this.apiService.apiCall(LOG_IN_USER, { user });
  }

  saveAuthData(token: string, expiresIn: number): void {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('expiration', JSON.stringify(expiresIn));
  }

  getAuthData(): AuthData {
    const token = localStorage.getItem('token') || 'TokenFromService';
    const expiresIn = +localStorage.getItem('expiration');

    if (!token || !expiresIn) {
      return null;
    }

    return {
      token,
      expiresIn
    };
  }

  setAuthTimer(duration: number) {
    console.log('Setting Timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    clearTimeout(this.tokenTimer);
  }
}
