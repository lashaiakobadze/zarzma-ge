import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { CoreConfig, ApiService, COUNTRY_URL } from './core';
import { UserFacade } from './core/user/facades/user.facade';
import { AutoAuthUser } from './core/user/store/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'zarzma';

  private unsubscribe$: Subject<null> = new Subject();

  constructor(
    private apiService: ApiService,
    private coreConfig: CoreConfig,
    private userFacade: UserFacade,
    private cdr: ChangeDetectorRef,
    private store: Store
  ) {}

  config = this.coreConfig.select((r) => r.environment);

  ngOnInit(): void {
    const url = { ...COUNTRY_URL };

    this.userFacade
      .selectUserToken()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((token: string) => {
        console.log(token);
        this.cdr.markForCheck();
      });

    this.apiService.apiCall(url).subscribe((data: any) => console.log(data));

    this.store.dispatch(AutoAuthUser());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
