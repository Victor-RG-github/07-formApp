import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder) {}

  deleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  addFavorite(): void {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.formBuilder.control(newGame, Validators.required)
    );
    this.newFavorite.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    (this.form.controls['favoriteGames'] as FormArray) = this.formBuilder.array(
      []
    );
    this.form.reset();
  }

  get favoriteGames(): FormArray {
    return this.form.get('favoriteGames') as FormArray;
  }

  isInvalidField(field: keyof typeof this.form.controls): boolean | null {
    console.log('errors', this.form.controls[field].errors);
    console.log('touched', this.form.controls[field].touched);

    return (
      this.form.controls[field].errors && this.form.controls[field].touched
    );
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    console.log('errors', formArray.controls[index].errors);
    console.log('touched', formArray.controls[index].touched);

    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  getFieldError(field: keyof typeof this.form.controls): string | null {
    if (!this.form.controls[field].errors) return null;

    const errors = this.form.controls[field].errors || {};
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
}
