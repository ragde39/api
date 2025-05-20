import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup; // 1. Declaración correcta del FormGroup
  errorMessage = '';

  constructor(
    private fb: FormBuilder, // 2. Inyectamos FormBuilder como 'fb'
    private authService: AuthService,
    private router: Router
  ) {
    // 3. Inicializamos el formulario en el constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService
        .login({
          email: this.loginForm.value.email || '', // 4. Aseguramos string no nulo
          password: this.loginForm.value.password || '',
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.errorMessage = 'Credenciales inválidas'; //es lo que se le muestra al usuario
            console.error(err);
          },
        });
    }
  }
}
