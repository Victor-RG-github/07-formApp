import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``,
})
export class SwitchesPageComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    gender: ['M', [Validators.required]],
    notificationsEnabled: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  person = {
    gender: 'F',
    notificationsEnabled: false,
  };

  constructor(private formBuilder: FormBuilder) {}

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
    const { termsAndConditions, ...newPerson } = this.form.value;
    this.person = newPerson;
  }

  isInvalidField(field: keyof typeof this.form.controls): boolean | null {
    console.log('errors', this.form.controls[field].errors);
    console.log('touched', this.form.controls[field].touched);

    return (
      this.form.controls[field].errors && this.form.controls[field].touched
    );
  }

  ngOnInit(): void {
    this.form.reset(this.person);
  }
}
