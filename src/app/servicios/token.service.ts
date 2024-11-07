import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Buffer } from 'buffer';

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private authStatus$ = new BehaviorSubject<boolean>(this.isLogged());

  constructor(private router: Router) {}

  public setToken(token: string): void {
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.authStatus$.next(true); 
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return this.getToken() !== null;
  }

  public login(token: string): void {
    this.setToken(token);
    const rol = this.getRol();
    const destino = rol === "ADMINISTRADOR" ? "/home-admin" : "/home-cliente";
    this.router.navigate([destino]);
  }

  public logout(): void {
    window.sessionStorage.clear();
    this.authStatus$.next(false);  // Emitir estado no autenticado
    this.router.navigate(["/login"]);
  }

  private decodePayload(token: string): any {
    try {
      const payload = token.split(".")[1];
      const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
      return JSON.parse(payloadDecoded);
    } catch (error) {
      console.error("Error decoding token payload:", error);
      return null;
    }
  }

  public getIDCuenta(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values?.id || '';
    }
    return '';
  }

  public getRol(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values?.rol || '';
    }
    return '';
  }

  public getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values?.sub || '';
    }
    return '';
  }

  public getAuthStatus() {
    return this.authStatus$.asObservable();
  }
}
