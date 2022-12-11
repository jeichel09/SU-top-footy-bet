import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable()
export class ErrorhandlingService {
  getErrorMsg(formGroup: FormGroup, inputType: string) {
    if (inputType === "firstName") {
      if (formGroup.get("firstName")!.hasError("required")) {
        return "This field is required!";
      }
    }

    if (inputType === "email") {
      if (formGroup.get("email")!.hasError("required")) {
        return "This field is required!";
      }

      return formGroup.get("email")!.hasError("email") ? "Not a valid email!" : "";
    }

    if (inputType === "username") {
      if (formGroup.get("username")!.hasError("required")) {
        return "This field is required!";
      }

      return formGroup.get("username")!.hasError("minlength") ? "Username must be at least 6 characters long!" : "";
    }

    if (inputType === "password") {
      if (formGroup.get("password")!.hasError("required")) {
        return "This field is required!";
      }

      return formGroup.get("password")!.hasError("minlength") ? "Password must be at least 8 characters long!" : "";
    }

    if (inputType === "repass") {
      if (formGroup.get("repass")!.hasError("required")) {
        return "This field is required!";
      }

      if (formGroup.get("repass")!.hasError("passwordMismatch")) {
        return "Passwords do not match!";
      }

      return formGroup.get("repass")!.hasError("minlength") ? "Password must be at least 8 characters long!" : "";
    }
  }
}
