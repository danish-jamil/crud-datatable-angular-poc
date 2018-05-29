import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate,
  RouterState,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators/take';
import { first } from 'rxjs/operators/first';
import { ComponentCanDeactivate } from '../classes/component-can-deactivate';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent } from '../alert/alert.component';

@Injectable()
export class PendingChangesGuard
  implements CanDeactivate<ComponentCanDeactivate> {
  bsModalRef: BsModalRef;
  decision: boolean;
  constructor(private bsModalService: BsModalService, private router: Router) {}

  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!component.canDeactivate()) {
      const initialState = {
        title: 'Alert!',
        message: 'You have unsaved changes. Are you sure you want to navigate?'
      };
      this.bsModalRef = this.bsModalService.show(AlertComponent, {
        initialState
      });
      this.bsModalRef.content.closeBtnName = 'Close';
      this.bsModalService.onHide.pipe(take(1)).subscribe(decision => {
        console.log(decision);
        console.log(nextState.url);
        this.decision = decision;
        decision ? this.router.navigate([nextState.url]) : '';
        this.bsModalRef.hide();
      });
      return this.decision;
    } else {
      return true;
    }
  }
}
