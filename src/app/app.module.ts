import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SimpleModalContentComponent } from './simple-modal-content/simple-modal-content.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './shared/services/employee.service';


@NgModule({
  declarations: [
    AppComponent,
    SimpleModalContentComponent
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
  entryComponents: [SimpleModalContentComponent]
})
export class AppModule { }
