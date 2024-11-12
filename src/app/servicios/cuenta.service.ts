import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { EditarCuentaDTO } from '../dto/editar-cuenta-dto';
@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private adminURL = "http://localhost:8080/api/cuenta";

  constructor(private http: HttpClient) { }

  public editarEvento(EditarCuentaDTO: EditarCuentaDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/editar-perfil`, EditarCuentaDTO);
  }
}
