import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  closeBtnName: string;
  @Input() title: string;
  @Input() message: string;

  constructor(
    public bsModalRef: BsModalRef,
    public bsModalService: BsModalService
  ) {}

  ngOnInit() {}

  close(decision: boolean) {
    this.bsModalService.onHide.next(decision);
    this.bsModalRef.hide();
  }
}
