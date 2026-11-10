import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Como usuarioAutenticado é um Signal, deve ser chamado como uma função ()
    if (authService.usuarioAutenticado()) {
        return true;
    }

    // Se não estiver autenticado, manda de volta para a tela de login
    return router.createUrlTree(['/login']);
};