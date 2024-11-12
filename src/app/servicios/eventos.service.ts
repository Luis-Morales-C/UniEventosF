import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InformacionEventoDTO } from '../dto/informacion-evento-dto';
import { MensajeDTO } from '../dto/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private eventoURL = "http://localhost:8080/api/evento";  // URL del backend

  constructor(private http: HttpClient) { }

  obtenerInformacionEvento(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.eventoURL}/obtener-evento/${id}`);
  }
}
