import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AppEventService {
  private DemoFormValue: EventEmitter<any>;
  private ExampleLinkClicked: EventEmitter<any>;

  constructor() {
    this.DemoFormValue = new EventEmitter<any>();
    this.ExampleLinkClicked = new EventEmitter<any>();
  }

  public emitDemoFormValueEvent(fg: any): void {
    this.DemoFormValue.emit(fg);
  }

  public getDemoFormValueEvent(): EventEmitter<any> {
    return this.DemoFormValue;
  }

  public emitExampleLinkClickedEvent(): void {
    this.ExampleLinkClicked.emit();
  }

  public getExampleLinkClickedEvent(): EventEmitter<any> {
    return this.ExampleLinkClicked;
  }

}
