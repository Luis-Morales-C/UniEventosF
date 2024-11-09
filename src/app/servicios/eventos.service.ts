import { Injectable } from '@angular/core';
import { EventoDTO } from '../dto/evento-dto';
import { MensajeDTO } from '../dto/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InformacionEventoDTO } from '../dto/informacion-evento-dto';



@Injectable({
 providedIn: 'root'
})
export class EventosService {

  private eventoURL = "http://localhost:8080/api/evento";

  constructor(private http: HttpClient) { }


  public obtenerEvento(id: string): Observable<InformacionEventoDTO> {
    return this.http.get<InformacionEventoDTO>(`${this.eventoURL}/obtener-evento/${id}`);
  }
}
