import { Injectable } from '@angular/core';
import { ApiService } from '../../api';

export interface AuthData {
  token: string;
  expirationDate: Date;
}

@Injectable()
export class UserService {
  constructor(private apiService: ApiService) {}
  /**
   * returns user object if token is valid
   *
   * @param token
   * s {Observable<Player>}
   * @memberof UserService
   */
  isPlayerAuthenticated(token: string, expirationDate: Date) {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  getAuthData(): AuthData {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if (!token || !expirationDate) {
      return null;
    }

    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }
}
