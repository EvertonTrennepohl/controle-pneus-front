import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../../shared/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Injeção do HttpClient usando a função inject()
  private readonly http = inject(HttpClient);

  // Url base obtida automaticamente do environment (Localhot ou Render)
  private readonly apiUrl = `${environment.apiUrl}/auth/login`;

  // Signal que armazena seo usuário está autenticado
  // Inicializa checando se já existe um token salvo no LocalStorage
  localStorageTokenKey = 'frota_pneus_token';
  usuarioAutenticado = signal<boolean>(this.hasToken());

  login(dadosLogin: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, dadosLogin).pipe(
      tap((response) => {
        // Quando o login der certo, salva o token JWT no navegador
        if(response && response.token) {
          localStorage.setItem(this.localStorageTokenKey, response.token);
          this.usuarioAutenticado.set(true); // Atualiza o estado para logado
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.localStorageTokenKey);
    this.usuarioAutenticado.set(false); // Atualiza o estado para deslogado
  }

  getToken(): string | null {
    return localStorage.getItem(this.localStorageTokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.localStorageTokenKey);
  }

}
