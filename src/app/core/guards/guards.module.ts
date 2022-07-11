import { NgModule } from '@angular/core';
import { DetectLangGuard } from './detect-language.guard';

const GUARDS = [DetectLangGuard];

@NgModule({
  declarations: [],
  exports: [],
  providers: [...GUARDS]
})
export class SBGuardsModule {}
