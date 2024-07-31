import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  cantBeStrider: ValidationErrors | null = (control: FormControl) => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }
    return null;
  };

  isInvalidField(
    form: FormGroup,
    field: keyof typeof form.controls
  ): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const fieldValueOne = formGroup.get(fieldOne)?.value;
      const fieldValueTwo = formGroup.get(fieldTwo)?.value;
      if (fieldValueOne !== fieldValueTwo) {
        formGroup.get(fieldTwo)?.setErrors({ notEquals: true });
        return { notEquals: true };
      }
      formGroup.get(fieldTwo)?.setErrors(null);
      return null;
    };
  }
}
