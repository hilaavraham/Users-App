import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { User } from './../user-details/user-details.component';

@Component({
  selector: 'user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.css']
})

export class UserDetailsFormComponent implements OnInit {
  @Output() submitEvent: EventEmitter<User> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<User> = new EventEmitter();
  @Input() isEditMode!: boolean;
  @Input() user: User | undefined;

  userDetailsForm = this.fb.group({
    name: ['', Validators.required],
    username: [''],
    email: [''],
    phone:[''],
    address: this.fb.group({
      street: [''],
      suite:[''],
      city: [''],
    })
  });

  onSubmit() {
    this.submitEvent.emit({ ...this.userDetailsForm.value, id: this.user?.id });
  }

  onCancel() {
    this.isEditMode = false;
    this.cancelEvent.emit({...this.userDetailsForm.value, id: this.user?.id});
    console.log(this.isEditMode);
  }
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.isEditMode && this.user) {
      this.userDetailsForm.patchValue(this.user);
    }
  }

}
