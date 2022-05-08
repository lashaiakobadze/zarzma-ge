import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CoreConfig, ApiService, COUNTRY_URL } from './core';
import { UpdateUserToken } from './core/user/store/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zarzma';

  constructor(
    private apiService: ApiService,
    private coreConfig: CoreConfig,
    private store: Store
  ) {}

  config = this.coreConfig.select((r) => r.environment);

  ngOnInit(): void {
    const url = { ...COUNTRY_URL };

    this.apiService.apiCall(url).subscribe((data: any) => console.log(data));

    this.store.dispatch(UpdateUserToken());
  }
}
