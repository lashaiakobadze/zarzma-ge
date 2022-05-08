import { Component, OnInit } from '@angular/core';
import { CoreConfig, ApiService, COUNTRY_URL } from './core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zarzma';

  constructor(private apiService: ApiService, private coreConfig: CoreConfig) {}

  config = this.coreConfig.select((r) => r.environment);

  ngOnInit(): void {
    const url = { ...COUNTRY_URL };
    console.log(this.config);

    this.apiService.apiCall(url).subscribe((data: any) => console.log(data));
  }
}
