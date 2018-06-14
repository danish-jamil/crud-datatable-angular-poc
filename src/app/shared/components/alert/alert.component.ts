import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomNGXLoggerService, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
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
  @HostListener('document:keyup', ['$event'])
  onKeyUp(v: KeyboardEvent) {}
}
