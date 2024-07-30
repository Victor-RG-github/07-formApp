import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent implements OnInit {
  /* myForm : FormGroup = new FormGroup({
    name : new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0)
  }); */

  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({ price: 10, inStorage: 0 });
  }

  isInvalidField(field: keyof typeof this.myForm.controls): boolean | null {
    console.log('errors', this.myForm.controls[field].errors);
    console.log('touched', this.myForm.controls[field].touched);

    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: keyof typeof this.myForm.controls): string | null {
    if (!this.myForm.controls[field].errors) return null;

    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          console.log(errors['minlength']);
          return `El tamaño minimo de este campo es de ${errors['minlength'].requiredLength} letras`;
        case 'min':
          console.log(errors['min']);
          return `El valor del campo ha de ser un número mayor o igual que ${errors['min'].min}`;
      }
    }
    return 'El valor introducido no es válido';
  }

  ngOnInit(): void {
    this.myForm.reset({});
  }
}
