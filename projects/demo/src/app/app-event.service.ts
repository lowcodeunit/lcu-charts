import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AppEventService {
  private ExampleLinkClicked: EventEmitter<any>;

  constructor() {
    this.ExampleLinkClicked = new EventEmitter<any>();
  }

  public emitExampleLinkClickedEvent(): void {
    this.ExampleLinkClicked.emit();
  }

  public getExampleLinkClickedEvent(): EventEmitter<any> {
    return this.ExampleLinkClicked;
  }

}
