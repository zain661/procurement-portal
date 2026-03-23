import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup;
  loading = false;
  error = '';

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const { name, email, password } = this.form.value;

    this.authService.signup(name!, email!, password!).subscribe({
      next: (res) => {
        this.authService.saveSession(res.token, res.user);
        this.router.navigate(['/catalog']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Signup failed';
        this.loading = false;
      },
    });
  }
}