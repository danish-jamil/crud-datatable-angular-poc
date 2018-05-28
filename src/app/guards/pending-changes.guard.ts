import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../classes/component-can-deactivate';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../alert/alert.component';

@Injectable()
export class PendingChangesGuard
  implements CanDeactivate<ComponentCanDeactivate> {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!component.canDeactivate()) {
      const initialState = {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...'
        ],
        title: 'Modal with component'
      };
      this.bsModalRef = this.modalService.show(AlertComponent, {
        initialState
      });
      this.bsModalRef.content.closeBtnName = 'Close';
    }
    return false;
  }
}
