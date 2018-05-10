import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Employee, Action } from '../shared/models/employee';
import { EmployeeService } from '../shared/services/employee.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-simple-modal-content',
  templateUrl: './simple-modal-content.component.html',
  styleUrls: ['./simple-modal-content.component.scss']
})
export class SimpleModalContentComponent implements OnInit {
  
  @Input() employee: Employee = new Employee();
  public lastId: number = 0;
  public onClose: Subject<Employee>;

  employeeForm: FormGroup;
  
  title: string = 'Add New Employee';
  closeBtnName: string = 'Close';
  saveBtnName: string = 'Save';
  action: any = Action.New;
  loading: boolean = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(8)]],
      age: '',
      gender: '',
      company: ['', Validators.required]
    })
  }
 
  ngOnInit() { 
    console.log(this.employee);
    this.onClose = new Subject();
    if(this.action == Action.Update || this.action == Action.Copy){
      this.employeeForm.setValue({
        id: this.employee.id,
        name: this.employee.name,
        age: this.employee.age | 0,
        gender: this.employee.gender,
        company: this.employee.company
      });
    }
    // this.employeeForm.reset();
  }

  saveEmployee(employee: Employee, isValid: boolean){
    console.log('submitted');
    this.loading = true;
    if(isValid){
      switch (this.action) {
        case Action.New:
          employee.id = this.employee.id + 1;
          this.employeeService.addEmployee(employee)
            .subscribe(
              (res) => {
                this.onClose.next(employee);
                this.loading = false;
                this.bsModalRef.hide();
                console.log('New record created');
              }
            );
          break;
        case Action.Update:
          this.employeeService.updateEmployee(employee)
            .subscribe(
              (res) => {
                this.onClose.next(employee);
                this.loading = false;
                this.bsModalRef.hide();
                console.log('record updated');
              }
            );
          console.log('Record updated');
          break;
        case Action.Copy:
          employee.id = this.lastId + 1;
          console.log(employee);
          this.employeeService.addEmployee(employee)
            .subscribe(
              (res) => {
                this.onClose.next(employee);
                this.loading = false;
                this.bsModalRef.hide();
                console.log('New record created');
              }
            );
          console.log('Record copied');
          break;
        
        default:
          console.log('default case');
          break;
      }

      // this.employeeForm.reset();
    }
  }

}
