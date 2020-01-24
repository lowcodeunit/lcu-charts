import { Component, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatTabChangeEvent, MatSnackBar } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartGlobalOptionsModel } from '../models/chart-global-options.model';
import { ChartNavModel } from '../models/chart-nav.model';

@Component({
  selector: 'lcu-code-dialog',
  templateUrl: './code-dialog.component.html',
  styleUrls: ['./code-dialog.component.scss']
})
export class CodeDialogComponent implements AfterViewInit {
  public CSSCode: any;
  public CurrentCodeBlock: ElementRef<any>;
  public DialogTitle: string;
  public HTMLCode: any;
  public TypescriptCode: any;

  @ViewChild('htmlBlock', { static: false }) public htmlBlock: ElementRef<any>;
  @ViewChild('tsBlock', { static: false }) public tsBlock: ElementRef<any>;
  @ViewChild('cssBlock', { static: false }) public cssBlock: ElementRef<any>;

  constructor(
    private dialogRef: MatDialogRef<CodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { chart: ChartNavModel, form: ChartGlobalOptionsModel },
    private snackBar: MatSnackBar
  ) {
    this.CSSCode = [`/** No CSS for this chart */`];
    this.DialogTitle = this.data.chart.title + ' Code';
    this.HTMLCode = this.generateHTMLCode(this.data.form);
    this.TypescriptCode = this.removeProps(this.data.form);
    this.TypescriptCode = this.generateTsCode(this.TypescriptCode);
  }

  public ngAfterViewInit(): void {
    this.CurrentCodeBlock = this.htmlBlock;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onCopy(): void {
    const copyText = this.CurrentCodeBlock.nativeElement.textContent;
    const textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    this.snackBar.open('Successfully Copied!', 'Dismiss', {
      duration: 3000
    });
  }

  public selectedTabChangeEvent(event: MatTabChangeEvent): void {
    switch (event.tab.textLabel) {
      case 'HTML':
        this.CurrentCodeBlock = this.htmlBlock;
        break;
      case 'TS':
        this.CurrentCodeBlock = this.tsBlock;
        break;
      case 'CSS':
        this.CurrentCodeBlock = this.cssBlock;
        break;
      default:
        this.CurrentCodeBlock = this.htmlBlock;
        break;
    }
  }

  private generateTsCode(data): any {
    let arr = [];
    for (const [key, value] of Object.entries(data)) {
      const propValue = typeof value === 'string' ? `'${value}'` : value;
      arr.push(`public ${key}: ${typeof value} = ${propValue};`);
    }
    arr.push(' ');
    arr = arr.concat(this.getConstructorCode());
    arr = arr.concat(this.getNgOnInitCode());
    arr = arr.concat(this.getClassFunctionsCode());
    return arr;
  }

  private generateHTMLCode(data): any {
    const arr = [];
    arr.push(`<${this.data.chart.selector}`);
    arr.push(`  class="chart-container"`);

    Object.keys(data).forEach((key) => {
      arr.push(`  [${key}]="${key}"`);
    });

    arr.push(`  (activate)="activate($event)"`);
    arr.push(`  (deactivate)="deactivate($event)"`);
    arr.push(`  (select)="select($event)">`);
    arr.push(`</${this.data.chart.selector}>`);
    return arr;
  }

  private getConstructorCode(): any {
    const arr = [];
    arr.push(`constructor() {`);
    arr.push(`  Object.assign(this, {`);
    arr.push(`    colorSets,`);
    arr.push(`    single`);
    arr.push(`  });`);
    arr.push(`  this.setColorScheme('fathym');`);
    arr.push(`}`);
    arr.push(` `);
    return arr;
  }

  private getNgOnInitCode(): any {
    const arr = [];
    arr.push(`public ngOnInit(): void {`);
    arr.push(`  if (!this.fitContainer) {`);
    arr.push(`    this.applyDimensions();`);
    arr.push(`  }`);
    arr.push(`}`);
    arr.push(` `);
    return arr;
  }

  private getClassFunctionsCode(): any {
    const arr = [];
    arr.push(`public activate(data: any): void {`);
    arr.push(`  console.log('Activate', JSON.parse(JSON.stringify(data)));`);
    arr.push(`}`);
    arr.push(` `);
    arr.push(`public deactivate(data: any): void {`);
    arr.push(`  console.log('Deactivate', JSON.parse(JSON.stringify(data)));`);
    arr.push(`}`);
    arr.push(` `);
    arr.push(`public select(data: any): void {`);
    arr.push(`  console.log('Item clicked', JSON.parse(JSON.stringify(data)));`);
    arr.push(`}`);
    arr.push(` `);
    arr.push(`private applyDimensions(): void {`);
    arr.push(`  this.view = [this.width, this.height];`);
    arr.push(`}`);
    arr.push(` `);
    arr.push(`private setColorScheme(name: string): void {`);
    arr.push(`  this.colorScheme = this.colorSets.find(s => s.name === name);`);
    arr.push(`}`);
    return arr;
  }

  private removeProps(data): any {
    delete data.colorSets;
    return data;
  }

}
