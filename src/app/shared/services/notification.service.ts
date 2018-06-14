import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationProperties } from '@admin/interfaces/NotificationProperties';

@Injectable()
export class NotificationService {
  constructor(private toasterService: ToastrService) {}

  success(successNotify: NotificationProperties) {
    this.toasterService.success();
  }
  error(errorNotify: NotificationProperties) {
    this.toasterService.error(errorNotify.message, errorNotify.title);
  }
  warning(warnNotify: NotificationProperties) {
    this.toasterService.warning(warnNotify.message, warnNotify.title);
  }
}
