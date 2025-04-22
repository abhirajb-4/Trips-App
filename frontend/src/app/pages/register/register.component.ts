import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid || this.passwordsDoNotMatch()) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    const { username, email, password } = this.registerForm.value;

    this.userService.registerUser({ username, email, password }).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = '';
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registration failed.';
        this.successMessage = '';
      }
    });
  }

  passwordsDoNotMatch(): boolean {
    return this.registerForm.value.password !== this.registerForm.value.confirmPassword;
  }
}
