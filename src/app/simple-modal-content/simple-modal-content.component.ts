import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../shared/services/employee.service';

enum Action{
  New, Copy, Update
}

@Component({
  selector: 'app-simple-modal-content',
  templateUrl: './simple-modal-content.component.html',
  styleUrls: ['./simple-modal-content.component.scss']
})
export class SimpleModalContentComponent implements OnInit {
  
  @Input() employee: Employee = new Employee();
  
  title: string = 'Add New Employee';
  closeBtnName: string = 'Close';
  saveBtnName: string = 'Save';
  action: any = Action.New;

  constructor(
    public bsModalRef: BsModalRef, 
    private employeeService: EmployeeService
  ) {}
 
  ngOnInit() {}

  save(){
    switch (this.action) {
      case Action.New:
        this.employeeService.addEmployee(this.employee)
          .subscribe((res) => console.log(res));
        break;
      case Action.Update:
        this.employeeService.updateEmployee(this.employee)
          .subscribe((res) => console.log(res));
        break;
      case Action.Copy:
        this.employeeService.addEmployee(this.employee)
          .subscribe((res) => console.log(res));
        break;
      
      default:
        break;
    }
  }

}
