import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationProperties } from '@admin/interfaces/NotificationProperties';
import * as _Global from '@admin/constants/constants';

@Injectable()
export class NotificationService {
	constructor(private toasterService: ToastrService) {}

	success(successNotify: NotificationProperties) {
		this.toasterService.success(successNotify.message, successNotify.title, _Global.Constant.ToastrOptions);
	}
	error(errorNotify: NotificationProperties) {
		this.toasterService.error(errorNotify.message, errorNotify.title, _Global.Constant.ToastrOptions);
	}
	warning(warnNotify: NotificationProperties) {
		this.toasterService.warning(warnNotify.message, warnNotify.title, _Global.Constant.ToastrOptions);
	}
}
