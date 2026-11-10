import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  selector: 'app-login',
  standalone: true,
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Usando Signal para gerenciar o estado local de erro e carregamento (Padrão Angular 22)
  errorMessage = signal<String | null>(null);
  isLoading = signal<boolean>(false);

  // Estrututa do formulário reativo fortemente tipado
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: () => {
        // Redireciona para o painel principal após capturar o token JWT
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.isLoading.set(false);
        // Captura a mensagem tratada da API ou exibe um fallback seguro
        this.errorMessage.set(err.error?.message || 'Falha ao realizar login. Verifique suas credenciais.')
      }
    })
  }
}