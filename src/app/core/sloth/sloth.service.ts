import {
  Injectable,
  Inject,
  NgModuleFactory,
  Compiler,
  Injector
} from '@angular/core';
import * as Fuse from 'fuse.js';
import {
  LAZY_LOADING_MODULES,
  LazyComponentsModuleDef,
  LAZY_LOADING_COMPONENTS
} from './sloth-tokens';

@Injectable()
export class SlothService {
  PATHS: Array<LazyComponentsModuleDef> = [];

  constructor(
    @Inject(LAZY_LOADING_MODULES)
    modulePath: [][],
    private compiler: Compiler,
    private injector: Injector
  ) {
    modulePath.forEach((module) => {
      this.PATHS.push(...module);
    });
  }

  /**
   * @param selector component selector name
   * @returns Object which contains component factory and injector
   * @todo should be simplify! Should be handle expected errors. e.x: Incorrect selector name
   * and should be get problem descriptions
   * @link https://singular.atlassian.net/browse/SS-7525
   */
  async loadComponentModule(selector: string) {
    const lazyComponentsModuleDef = this.PATHS.find(
      (path) => path.selector == selector
    );
    // If we can't find LazyComponentsModuleDef through selector should be find
    // similar selector from `PATCHES` and suggest to developer and throw error.
    if (!lazyComponentsModuleDef) {
      const moduleWithSimilarSelector = this.findSimilarModule(selector);
      let errorText = `Can't load module with selector '${selector}'.`;
      if (moduleWithSimilarSelector?.length) {
        errorText += ` Do you mean '${moduleWithSimilarSelector}'?`;
      }
      throw Error(errorText);
    }
    /**********************************************************************/

    const module = await lazyComponentsModuleDef.loadChildren();
    const moduleFactory = await this.loadModuleFactory(module);
    const moduleRef = moduleFactory.create(this.injector);
    const component = moduleRef.injector
      ?.get(LAZY_LOADING_COMPONENTS)
      .find((inj) => inj.selector == selector)?.component;
    let componentfactory =
      moduleRef.componentFactoryResolver.resolveComponentFactory(component);
    return { compFactory: componentfactory, injector: moduleRef.injector };
  }

  private async loadModuleFactory(t: any) {
    if (t instanceof NgModuleFactory) {
      return t;
    } else {
      return await this.compiler.compileModuleAsync(t);
    }
  }

  private findSimilarModule(selector: string) {
    const searcher = new Fuse(this.PATHS, { keys: ['selector'] });
    const result = searcher.search(selector);
    if (result.length) {
      return result[0].selector;
    }
    return null;
  }
}
