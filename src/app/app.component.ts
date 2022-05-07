import { Component, OnInit } from '@angular/core';
import { CoreConfig } from './core/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zarzma';

  constructor(private coreConfig: CoreConfig) {}

  config = this.coreConfig.select((r) => r.environment);

  ngOnInit(): void {
    console.log(this.config);
  }
}
