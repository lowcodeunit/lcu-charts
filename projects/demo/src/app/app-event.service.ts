import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AppEventService {
  private DemoFormValue: EventEmitter<any>;
  private ExampleLinkClicked: EventEmitter<any>;
  private RealTimeClicked: EventEmitter<boolean>;

  constructor() {
    this.DemoFormValue = new EventEmitter<any>();
    this.ExampleLinkClicked = new EventEmitter<any>();
    this.RealTimeClicked = new EventEmitter<boolean>();
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

  public emitRealTimeCheckedEvent(value: boolean): void {
    this.RealTimeClicked.emit(value);
  }

  public getRealTimeCheckedEvent(): EventEmitter<boolean> {
    return this.RealTimeClicked;
  }

}
