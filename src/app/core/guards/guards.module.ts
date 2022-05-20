import { NgModule } from '@angular/core';
import { SBDetectLangGuard } from './detect-language.guard';

const GUARDS = [SBDetectLangGuard];

@NgModule({
  declarations: [],
  exports: [],
  providers: [...GUARDS]
})
export class SBGuardsModule {}
