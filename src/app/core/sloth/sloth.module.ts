import { NgModule, ModuleWithProviders, Inject } from '@angular/core';
import { SlothComponent } from './sloth.component';
import {
  LazyComponentsModuleDef,
  LazyLoadingStatus,
  LAZY_LOADING_MODULES,
  LoadingStatus
} from './sloth-tokens';
import { SlothService } from './sloth.service';

@NgModule({
  declarations: [SlothComponent],
  imports: [],
  exports: [SlothComponent],
  providers: [SlothService]
})
export class SlothModule {
  static forRoot(modulePath: any[]): ModuleWithProviders<SlothModule> {
    return {
      ngModule: SlothModule,
      providers: [
        {
          provide: LAZY_LOADING_MODULES,
          useValue: modulePath,
          multi: true
        }
      ]
    };
  }

  static forChild(modulePath: any): ModuleWithProviders<SlothModule> {
    return {
      ngModule: SlothModule,
      providers: [
        {
          provide: LAZY_LOADING_MODULES,
          useValue: modulePath,
          multi: true
        }
      ]
    };
  }

  constructor(
    @Inject(LAZY_LOADING_MODULES)
    lazyModules: Array<LazyComponentsModuleDef & LazyLoadingStatus>[]
  ) {
    lazyModules.forEach((lazyModuleList) => {
      lazyModuleList.forEach(
        (module: LazyComponentsModuleDef & LazyLoadingStatus) => {
          if (module.data?.preload && !module.loading) {
            if (module.data.delay) {
              setTimeout(() => {
                this.loadModule(module);
              }, module.data.delay);
            } else {
              this.loadModule(module);
            }
          }
        }
      );
    });
  }

  loadModule(module: LazyComponentsModuleDef & LazyLoadingStatus) {
    module.loading = LoadingStatus.LOADING;
    return module
      .loadChildren()
      .then((_mod: any) => {
        module.loading = LoadingStatus.LOADED;
      })
      .catch((_error: any) => {
        module.loading = LoadingStatus.Error;
      });
  }
}
