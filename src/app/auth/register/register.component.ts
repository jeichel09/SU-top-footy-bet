import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { ErrorhandlingService } from 'src/app/services/errorhandling.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hasAuthError: boolean = false;
  getErrorMsg: any;

  constructor(
    private fBuilder: FormBuilder,
    private customValidationService: CustomValidationService,
    private getErrorMessages: ErrorhandlingService,
    private fb: FirebaseService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fBuilder.group({
      "firstName": ["", [Validators.required]],
      "lastName": ["", ],
      "email": ["", [Validators.required, Validators.email]],
      "username": ["", [Validators.required, Validators.minLength(6)]],
      "password": ["", [Validators.required, Validators.minLength(8)]],
      "repass": ["", [Validators.required, Validators.minLength(8)]]
    },
      {
        validator: this.customValidationService.passwordMatchValidator("password", "repass")
      }
    );

    this.getErrorMsg = this.getErrorMessages.getErrorMsg;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      let { email, password } = this.registerForm.value;
      this.fb.register(email, password)
      .catch( () => {
        this.hasAuthError = true;
      });
    }
  }
}
