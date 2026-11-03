// Espelha o seu LoginRequest do Java
export interface LoginRequest {
    email: string;
    senha: string
}

// Espelha o seu LoginResponse do Java
export interface LoginResponse {
    token: string;
}

// Interface auxiliar para saber qual é o usuário logado no sistema
export interface usuarioLogado {
    email: string;
    token: string;
}