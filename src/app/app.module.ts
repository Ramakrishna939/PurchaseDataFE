import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCsvParserModule } from 'ngx-csv-parser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LogoutComponent } from './components/logout/logout.component';
import { RouterModule } from '@angular/router';
import { AdminRegestrationComponent } from './components/admin-regestration/admin-regestration.component';
import { DataUploadComponent } from './components/data-upload/data-upload.component';
import { PurchaseAnalysisComponent } from './components/purchase-analysis/purchase-analysis.component';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import {PaginatorModule} from 'primeng/paginator';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    LogoutComponent,
    AdminRegestrationComponent,
    DataUploadComponent,
    PurchaseAnalysisComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCsvParserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    BrowserAnimationsModule,
    PaginatorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
