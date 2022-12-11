import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CustomValidationService {

  passwordMatchValidator(password: string, repass: string) {
    return (formGroup: FormGroup) => {
      let passwordControl = formGroup.controls[password];
      let repassControl = formGroup.controls[repass];

      if (!passwordControl || !repassControl) {
        return null;
      }

      if (
        repassControl.errors &&
        !repassControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== repassControl.value) {
        repassControl.setErrors({ passwordMismatch: true });
      } else {
        repassControl.setErrors(null);
      }
    };
  }
}
