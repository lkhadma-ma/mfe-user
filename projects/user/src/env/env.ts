export const environment = {
    production: false,
    apiUrl: (window as any).__env?.API_URL ?? 'http://localhost:3000/api' ,
    authUrl: (window as any).__env?.AUTH_URL ?? 'http://localhost:3000/auth',
};
