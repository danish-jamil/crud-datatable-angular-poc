import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormCanDeactivate } from '../classes/form-can-deactivate';

@Component({
  selector: 'app-form-unsaved-check',
  templateUrl: './form-unsaved-check.component.html',
  styleUrls: ['./form-unsaved-check.component.scss']
})
export class FormUnsavedCheckComponent extends FormCanDeactivate
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}

  name: string;

  @ViewChild('form') form: NgForm;

  submit() {
    console.log(this.form.submitted);
  }
}
