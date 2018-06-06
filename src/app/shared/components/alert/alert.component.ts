import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomNGXLoggerService, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import * as _Global from '@admin/constants/constants';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: [ './alert.component.scss' ]
})
export class AlertComponent implements OnInit, OnDestroy {
	@Input() title: string;
	@Input() message: string;
	btnTypeT: boolean;
	btnTypeF: boolean;
	logger: NGXLogger;
	constructor(
		private modalRef: BsModalRef,
		private modalService: BsModalService,
		private loggerService: CustomNGXLoggerService
	) {
		this.logger = this.loggerService.create({ level: NgxLoggerLevel.LOG });
	}

	ngOnInit() {
		this.btnTypeT = true;
		this.btnTypeF = false;
	}
	ngOnDestroy() {}

	onClose(value: boolean) {
		if (value) {
			this.modalRef.hide();
			this.modalService.onHide.next(value);
		} else {
			this.modalRef.hide();
		}
	}
	@HostListener('document:keyup', [ '$event' ])
	onKeyUp(v: KeyboardEvent) {
		if (v.code === _Global.KeyCodes.Enter || v.code === _Global.KeyCodes.KeyY) {
			this.onClose(true);
		} else if (v.code === _Global.KeyCodes.Escape || v.code === _Global.KeyCodes.KeyN) {
			this.onClose(false);
		} else {
			this.logger.log(v.code);
		}
	}
}
