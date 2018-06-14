import {
  Component,
  ViewChild,
  TemplateRef,
  OnInit,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SimpleModalContentComponent } from '../simple-modal-content/simple-modal-content.component';
import { EmployeeService } from '../shared/services/employee.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Employee, Action } from '../shared/models/employee';
import { HttpClient } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import { Post } from '../shared/models/post';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, OnDestroy {
  // Table reference
  @ViewChild(DatatableComponent) table: DatatableComponent;
  title = 'app';
  // Employees list: table rows
  employees: Employee[];
  bsModalRef: BsModalRef;
  // temp employees list
  temp = [];
  loading: boolean = false;
  isLoading = false;
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 10;
  rows: Post[] = [];
  // We will push all modal subscriptions in this list and unsubsribe them on destroy
  modalSubscriptions: Subscription[] = [];

  page = 1;

  constructor(
    private modalService: BsModalService,
    private employeeService: EmployeeService,
    private postsService: PostsService,
    private http: HttpClient,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.loading = true;
    // Fetch employees from API on component init
    // this.postsService.getPosts(1, 5).subscribe(posts => {
    //   this.rows = [...posts];
    //   // Add employees to temp array for search filtering
    //   this.temp = [...posts];
    //   this.loading = false;
    // });
    this.onScroll();
  }

  ngOnDestroy() {
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
      return (
        d.title.toLowerCase().indexOf(val) !== -1 ||
        d.body.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    console.log(temp);
    // update the rows
    this.employees = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect($event) {
    console.log($event);
  }

  addNew() {
    console.log(this.employees);
    // Set the initial state of the modal
    // Modal actions are performed based on action and lastId is only for mock api
    const initialState = {
      action: Action.New,
      lastId: this.employees[this.employees.length - 1].id // Last employee ID
    };
    // Create reference to Modal
    this.bsModalRef = this.modalService.show(SimpleModalContentComponent, {
      initialState
    });
    // Subscribe to onHide observable of Modal service
    this.modalSubscriptions.push(
      this.modalService.onHide.pipe(take(1)).subscribe(employee => {
        if (employee) {
          this.loading = true;
          this.addEmployee(employee);
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
    this.bsModalRef = this.modalService.show(SimpleModalContentComponent, {
      initialState
    });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalSubscriptions.push(
      this.modalService.onHide.pipe(take(1)).subscribe(employee => {
        if (employee) {
          this.loading = true;
          this.employeeService.updateEmployee(employee).subscribe(
            res => {
              console.log('Record updated');
              // replace updated employee in local array
              let itemIndex = this.employees.findIndex(
                emp => emp.id == employee.id
              );
              this.employees[itemIndex] = employee;
              this.employees = [...this.employees];
              console.log(this.employees);
              this.table.offset = 0;
            },
            err => console.log(err),
            () => (this.loading = false)
          );
        }
      })
    );
  }

  openModalForCopying(employee: Employee) {
    const initialState = {
      title: `Copy Employee ${employee.name}`,
      employee: employee,
      action: Action.Copy
    };
    this.bsModalRef = this.modalService.show(SimpleModalContentComponent, {
      initialState
    });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalSubscriptions.push(
      this.modalService.onHide.pipe(take(1)).subscribe(employee => {
        if (employee) {
          this.loading = true;
          this.addEmployee(employee);
        }
      })
    );
  }

  deleteRecord(employee: Employee) {
    this.loading = true;
    this.employeeService.deleteEmployee(employee).subscribe(res => {
      console.log(res);
      this.employees = [...this.employees.filter(item => item !== employee)];
      // this.employees = [...this.employees];
      this.loading = false;
    });
  }

  addEmployee(_employee: Employee) {
    //Mock API doesn't auto increment the ID. So, we do it manually
    _employee.id = this.employees[this.employees.length - 1].id + 1;

    this.employeeService.addEmployee(_employee).subscribe(
      res => {
        console.log('New record created');
        // Push new employee on top of array
        this.employees.push(_employee);
        this.employees = [...this.employees];
        console.log(this.employees);
        this.table.offset = 0;
      },
      err => {},
      () => (this.loading = false)
    );
  }

  onScrollold(offsetY) {
    console.log(offsetY);
    // total height of all rows in the viewport
    const viewHeight =
      this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;
    console.log(
      'offset+viewheight >= rows.length * rowHeight',
      offsetY + viewHeight,
      this.rows.length * this.rowHeight
    );
    // check if we scrolled to the end of the viewport
    if (
      !this.isLoading &&
      offsetY + viewHeight >= this.rows.length * this.rowHeight
    ) {
      // check if we haven't fetched any results yet
      // if (this.rows.length === 0) {
      //   // calculate the number of rows that fit within viewport
      //   const pageSize = Math.ceil(viewHeight / this.rowHeight);

      //   // change the limit to pageSize such that we fill the first page entirely
      //   // (otherwise, we won't be able to scroll past it)
      //   limit = Math.max(pageSize, this.pageLimit);
      // }
      this.loadPage(this.page);
      this.page++;
    }
  }

  onScroll() {
    if (!this.isLoading) {
      this.loadPage(this.page);
    }
  }

  private loadPage(offset, limit: number = this.pageLimit) {
    // set the loading flag, which serves two purposes:
    // 1) it prevents the same page from being loaded twice
    // 2) it enables display of the loading indicator
    this.isLoading = true;

    this.postsService.getPosts(offset, limit).subscribe(results => {
      this.rows = [...this.rows, ...results];
      console.log(this.rows);
      this.rows.length > 0 ? this.page++ : '';
      this.isLoading = false;
    });
  }

  paged() {
    console.log('paged');
  }
}
