import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { CoreConfig } from '../config';

@Injectable()
export class SBDetectLangGuard implements CanActivate {
  constructor(private router: Router, private coreConfig: CoreConfig) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const queryLang = route.paramMap.get('lang');
    const queryParams = route.queryParams;
    const localStorageLang = localStorage.getItem('lang');
    const configLangs = this.coreConfig.select(r => r.global.lang.langs);
    const defaultLang = this.coreConfig.select(r => r.global.lang.default);
    let activeLang;
    let params: Array<String>;
    const { url } = routerState;

    if (!queryLang) {
      activeLang = localStorageLang || defaultLang;
      this.router.navigate([activeLang]);
      return false;
    }

    if (queryLang) {
      const langIndex = configLangs.indexOf(queryLang);
      if (langIndex < 0) {
        activeLang = defaultLang;
      } else {
        activeLang = queryLang;
      }
      const urlParams: Array<String> = url.split('?');
      params = urlParams[0].split('/');
      params[1] = activeLang;

      if (queryLang === localStorageLang) {
        return true;
      }
      localStorage.setItem('lang', activeLang);
      this.router.navigate([params.join('/')], { queryParams });
      // return false;
      return true;
    }
    return false;
  }
}
