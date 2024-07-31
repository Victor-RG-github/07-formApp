import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as CustomValidators from '../../../shared/validators/validators';
import { ValidatorService } from '../../../shared/service/validator.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  form = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.firstNameAndLastnamePattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        //[new EmailValidator()],
        [this.emailValidator],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.cantBeStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [
        this.validatorService.isFieldOneEqualFieldTwo(
          'password',
          'confirmPassword'
        ),
      ],
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidator
  ) {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  isInvalidField(field: keyof typeof this.form.controls) {
    return this.validatorService.isInvalidField(this.form, field);
  }
}
