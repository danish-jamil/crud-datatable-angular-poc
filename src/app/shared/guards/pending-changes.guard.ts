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
import { AlertComponent } from '@admin/components/alert/alert.component';
import { take } from 'rxjs/operators/take';


@Injectable()
export class PendingChangesGuard
implements CanDeactivate<ComponentCanDeactivate> {
  bsModalRef: BsModalRef;

  constructor(private bsModalService: BsModalService) {}

  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let decision;
    if (!component.canDeactivate()) {
      const initialState = {
        title: 'Confirm',
        message:
          'You have unsaved changes, do you wish to proceed?'
      };
      this.bsModalRef = this.bsModalService.show(AlertComponent, {
        initialState
      });
      this.bsModalRef.content.closeBtnName = 'Close';
      decision = this.bsModalService.onHide
        .pipe(take(1))
        .subscribe(decision => {
          return decision;
        });
      return decision as boolean;
    } else {
      return true;
    }
  }
}
