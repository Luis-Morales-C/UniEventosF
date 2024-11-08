import { Injectable } from '@angular/core';
import { EventoDTO } from '../dto/evento-dto';
import { MensajeDTO } from '../dto/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
 providedIn: 'root'
})
export class EventosService {

  private eventoURL = "http://localhost:8080/api/evento";

  constructor(private http: HttpClient) { }


  public obtenerEvento(id: string): Observable<EventoDTO> {
    return this.http.get<EventoDTO>(`${this.eventoURL}/obtener-evento/${id}`);
  }
}
