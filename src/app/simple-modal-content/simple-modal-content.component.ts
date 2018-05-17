import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

  employeeForm: FormGroup;

  title: string = 'Add New Employee';
  closeBtnName: string = 'Close';
  saveBtnName: string = 'Save';
  action: any = Action.New;

  constructor(
    public bsModalRef: BsModalRef,
    public bsModalService: BsModalService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required, Validators.minLength(8)]],
      age: '',
      gender: '',
      company: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.employee);
    console.log(this.lastId);
    if (this.action == Action.Update || this.action == Action.Copy) {
      this.employeeForm.setValue({
        id: this.employee.id,
        name: this.employee.name,
        age: this.employee.age | 0,
        gender: this.employee.gender,
        company: this.employee.company
      });
    }
  }

  saveEmployee(employee: Employee, isValid: boolean) {
    if (isValid) {
      this.bsModalService.onHide.next(employee);
      this.bsModalRef.hide();
    }
  }
}
