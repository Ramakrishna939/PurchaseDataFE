import { Component, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  csvRecords: any[]| NgxCSVParserError=[];
    header: boolean = false;

    constructor(private ngxCsvParser: NgxCsvParser) {}

    @ViewChild('fileImportInput') fileImportInput: any;

    fileChangeListener($event: any): void {
        const files = $event.srcElement.files;
        this.header =
            (this.header as unknown as string) === 'true' ||
            this.header === true;

        this.ngxCsvParser
            .parse(files[0], {
                header: this.header,
                delimiter: ',',
                encoding: 'utf8'
            })
            .pipe()
            .subscribe(
                (result) => {
                    console.log('Result', result);
                     this.csvRecords = result;
                     console.log('Result 2', this.csvRecords);
                }
            );
    }
}
