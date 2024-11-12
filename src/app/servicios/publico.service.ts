import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { ItemEventoDTO } from '../dto/item-evento-dto';

@Injectable({
  providedIn: 'root'
})
export class PublicoService {

  eventos: ItemEventoDTO[];

  private publicoURL = "http://localhost:8080/api/publico";


  constructor(private http: HttpClient) {
    this.eventos=[];
   }

  public listarTipos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-tipo`);
  }

  public listarCiudades(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-ciudades`);

  }

  public listarEstados(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-estado`);
  }

  public listarEstadosCupon(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-estado-cupon`);
  }
  public listarTipoCupon(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-tipo-cupon`);
  }

  listarEventos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-eventos`);
  }

  public obtenerEvento(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/obtener-evento/${id}`);
  }

}
