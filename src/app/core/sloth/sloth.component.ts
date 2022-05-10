import {
  Attribute,
  ViewChild,
  ViewContainerRef,
  Component,
  Input,
  ChangeDetectorRef,
  SimpleChanges,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
  OnChanges
} from '@angular/core';
import { SlothService } from './sloth.service';

@Component({
  selector: 'sloth-outlet',
  template: ` <ng-container #anchor></ng-container> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlothComponent implements OnInit, OnChanges {
  @ViewChild('anchor', { read: ViewContainerRef }) anchor: ViewContainerRef;

  @Input() inputs: any = {};

  @Input() outputs: any = {};

  @Output() childIsCreated: EventEmitter<void> = new EventEmitter();

  _componentInstance: any;

  constructor(
    private service: SlothService,
    private cdr: ChangeDetectorRef,
    @Attribute('name') private name: string
  ) {}

  ngOnInit() {
    if (!this.name) {
      throw new Error(
        `name attribute is missing, without name attribute cant be determined which module should be lazy loaded`
      );
    }

    this.service.loadComponentModule(this.name).then(({ compFactory }) => {
      if (this.anchor) {
        this.anchor.clear();
        let component = this.anchor.createComponent(compFactory);

        let componentInstance: any = component.instance;

        this._componentInstance = componentInstance;

        if (this.inputs) {
          this.setInputs();
        }
        if (this.outputs) {
          let outputKeys = Object.keys(this.outputs);
          outputKeys.forEach((key) => {
            if (componentInstance.hasOwnProperty(key)) {
              componentInstance[key].subscribe((args: any) => {
                this.outputs[key](args);
              });
            }
          });
        }
        this.cdr.markForCheck();
        this.childIsCreated.emit();
      }
    });
  }

  private setInputs() {
    const inputKeys = Object.keys(this.inputs);
    inputKeys.forEach((key) => {
      if (this.inputs.hasOwnProperty(key) && this.inputs[key] !== undefined) {
        this._componentInstance[key] = JSON.parse(
          JSON.stringify(this.inputs[key] || null)
        );
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._componentInstance?.ngOnChanges) {
      if (this.inputs) {
        this.setInputs();
      }
      this._componentInstance.ngOnChanges(changes);
    }
  }
}
