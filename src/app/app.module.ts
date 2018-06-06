import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoadingModule } from 'ngx-loading';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { SimpleModalContentComponent } from './simple-modal-content/simple-modal-content.component';
import { EmployeeService } from './shared/services/employee.service';
import { InMemoryDataService } from './in-memory-data-service';
import { AuthInterceptor } from './shared/interceptors/auth-interceptor';
import { CrudComponent } from './crud/crud.component';
import { FormUnsavedCheckComponent } from './form-unsaved-check/form-unsaved-check.component';
import { PendingChangesGuard } from './guards/pending-changes.guard';
import { AlertComponent } from './alert/alert.component';
import { PostsService } from './services/posts.service';
import { UserManagerComponent } from './user-management/user-manager/user-manager.component';
import { UsersListComponent } from './user-management/user-manager/users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: CrudComponent
  },
  {
    path: 'form-check',
    component: FormUnsavedCheckComponent,
    canDeactivate: [PendingChangesGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SimpleModalContentComponent,
    CrudComponent,
    FormUnsavedCheckComponent,
    AlertComponent,
    UserManagerComponent,
    UsersListComponent
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      delay: 1500,
      passThruUnknownUrl: true
    }),
    RouterModule.forRoot(routes),
    InfiniteScrollModule
  ],
  providers: [
    EmployeeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    PendingChangesGuard,
    PostsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SimpleModalContentComponent, AlertComponent]
})
export class AppModule {}
