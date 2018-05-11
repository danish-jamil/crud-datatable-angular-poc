import { Component, ViewChild, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SimpleModalContentComponent } from './simple-modal-content/simple-modal-content.component';
import { EmployeeService } from './shared/services/employee.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Employee, Action } from './shared/models/employee';
import { HttpClient } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // Table reference
  @ViewChild(DatatableComponent) table: DatatableComponent;
  title = 'app';
  // Employees list: table rows
  employees: Employee[];
  bsModalRef: BsModalRef;
  // temp employees list
  temp = [];
  loading: boolean = false;
  // We will push all modal subscriptions in this list and unsubsribe them on destroy
  modalSubscriptions: Subscription[] = [];
  // Columns for table component
  columns = [
    { name: 'id' },
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' },
    { name: 'Edit'}
  ];
  
  constructor(
    private modalService: BsModalService, 
    private employeeService: EmployeeService, 
    private http: HttpClient
  ) { }
  
  ngOnInit(){
    this.loading = true;
    // Fetch employees from API on component init
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
        // Add employees to temp array for search filtering
        this.temp = [...employees];
        this.loading = false;
      });
  }

  ngOnDestroy(){
    //Unsubscribe any subscriptions
    this.modalSubscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.modalSubscriptions = [];
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log(val);
    // filter our data
    const temp = this.temp.filter(function(d) {
      return (d.name.toLowerCase().indexOf(val) !== -1 || d.gender.toLowerCase().indexOf(val) !== -1) || !val;
    });
    console.log(temp)
    // update the rows
    this.employees = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect($event){
    console.log($event);  
  }

  addNew(){
    console.log(this.employees);
    // Set the initial state of the modal
    // Modal actions are performed based on action and lastId is only for mock api
    const initialState = {
      action: Action.New,
      lastId: this.employees[this.employees.length - 1].id // Last employee ID
    };
    // Create reference to Modal
    this.bsModalRef = this.modalService.show(SimpleModalContentComponent, {initialState});
    // Subscribe to onHide observable of Modal service
    this.modalSubscriptions.push(
      this.modalService.onHide.pipe(take(1)).subscribe((employee) => {
        if(employee){
          // Push new employee on top of array
          this.employees.push(employee);
          this.employees = [...this.employees];
          console.log(this.employees);
          this.table.offset = 0;
        }
      })
    );
  }

  openModalForUpdating(employee: Employee) {
    const initialState = {
      title: `Edit Employee ${employee.name}`,
      employee: employee,
      action: Action.Update
    };
    this.bsModalRef = this.modalService.show(SimpleModalContentComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalSubscriptions.push(
      this.modalService.onHide.pipe(take(1)).subscribe((employee) => {
        if(employee){
          let itemIndex = this.employees.findIndex(emp => emp.id == employee.id);
          this.employees[itemIndex] = employee;
          this.employees = [...this.employees];
          console.log(this.employees);
          this.table.offset = 0;
        }
      })
    );
    // this.bsModalRef.content.employee = employee;
  }

  openModalForCopying(employee: Employee){
    const initialState = {
      title: `Copy Employee ${employee.name}`,
      employee: employee,
      action: Action.Copy
    };
    this.bsModalRef = this.modalService.show(SimpleModalContentComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.lastId = this.employees[this.employees.length - 1].id,
    this.modalSubscriptions.push(
      this.modalService.onHide.pipe(take(1)).subscribe((employee) => {
        if(employee){
          this.employees.push(employee);
          this.employees = [...this.employees];
          console.log(this.employees);
          this.table.offset = 0;
        }
      })
    );
  }

  deleteRecord(employee: Employee){
    this.loading = true;
    this.employeeService.deleteEmployee(employee).subscribe((res) => {
      console.log(res);
      this.employees = [...this.employees.filter(item => item !== employee)];
      // this.employees = [...this.employees];
      this.loading = false;
    })
  }
}
