import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api/api.service';
import { CoreConfig } from '../config';

@Injectable()
export class SSLanguageService {
  private renderer: Renderer2;
  private _currLang: string;
  public get currLang(): string {
    return this._currLang;
  }

  constructor(
    private apiService: ApiService,
    private config: CoreConfig,
    private translationService: TranslateService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  initialize(): void {
    this._currLang = this.findGetParameter('lang');
    const storageLang = localStorage.getItem('lang');
    if (!this.currLang && storageLang) {
      this._currLang = storageLang;
    }
    this.setLanguage(this.currLang);
  }

  setLanguage(lang: string) {
    this._currLang = this.getValidLang(lang);

    localStorage.setItem('lang', this.currLang);

    this.renderer.setAttribute(document.documentElement, 'lang', this.currLang);
    this.apiService.setLanguage(this.currLang);
    this.translationService.setDefaultLang(this.currLang);
    this.translationService.use(this.currLang);
  }

  findGetParameter = (parameterName: any): any => {
    let result = null,
      tmp = [];
    location.search
      .substr(1)
      .split('&')
      .forEach(function (item) {
        tmp = item.split('=');
        if (tmp[0] === parameterName) {
          result = decodeURIComponent(tmp[1]);
        }
      });
    return result;
  };

  getValidLang = (lang: string) => {
    const configLangs = this.config.select(r => r.global.lang.langs);
    const defaultLang = this.config.select(r => r.global.lang.default);
    let langIndex = -1;
    if (configLangs) {
      langIndex = configLangs.indexOf(lang);
    }

    return langIndex > -1 ? lang : defaultLang;
  };
}
