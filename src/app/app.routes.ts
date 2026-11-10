import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    // Redireciona a rota vazia diretamente para o login
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },

    // Rota pública: Tela de Login
    {
        path: 'login',
        loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    },

    // Rota privada: Protegida pela Functional AuthGuard
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },

    // Rota de Wildcard: Caso digitem uma URL que não existe, direciona para o Login
    {
        path: '**',
        redirectTo: 'login'
    }
];
