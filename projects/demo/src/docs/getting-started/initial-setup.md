# Initial Setup

### Requirements
Angular 9

### Installation
In your Angular project directory, run the following command to install the latest version of LCU-charts:

```bash
  npm install @lowcodeunit/lcu-charts-common --save
```

### Importing
In your `app.module.ts` file, add the 'LcuChartsModule' to your imports array like so:

```js
...
import { LcuChartsModule } from '@lowcodeunit/lcu-charts-common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LcuChartsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
