import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearCuentaDTO } from '../dto/crear-cuenta-dto';
import { LoginDTO } from '../dto/login-dto';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ActivarCuentaDTO } from '../dto/activar-cuenta-dto';
import { CambiarPasswordDTO } from '../dto/cambiar-password-dto';
import { CodigoPasswordDTO } from '../dto/codigo-password-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private authURL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  public crearCuenta(cuentaDTO: CrearCuentaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/crear-cuenta`, cuentaDTO);
  }

  public iniciarSesion(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
  }
  public activarCuenta(activarCuentaDTO: ActivarCuentaDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/activar`, activarCuentaDTO);
  }

  public cambiarPassword(cambiarPasswordDTO: CambiarPasswordDTO):Observable<MensajeDTO>{
    return this.http.put<MensajeDTO>(`${this.authURL}/cambiar-password`,cambiarPasswordDTO)
  }
  public enviarCodigoRecuperacionPassword(CodigoPasswordDTO: CodigoPasswordDTO):Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/recuperar-password`,CodigoPasswordDTO)
  }
}
