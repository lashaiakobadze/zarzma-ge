import { NgModule } from '@angular/core';
import { LazyComponentsModuleDef } from './core/sloth/sloth-tokens';
import { SlothModule } from './core/sloth/sloth.module';

const LAZY_MODULES: Array<LazyComponentsModuleDef> = [
  {
    selector: 'app-root',
    loadChildren: () => import('./app.module').then((mod) => mod.AppModule)
  }
];

@NgModule({
  imports: [SlothModule.forRoot(LAZY_MODULES)],
  exports: [SlothModule]
})
export class SlothLazyModule {}
