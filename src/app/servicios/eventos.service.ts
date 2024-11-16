import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InformacionEventoDTO } from '../dto/informacion-evento-dto';
import { MensajeDTO } from '../dto/mensaje-dto';
import { TipoEvento } from '../dto/tipo-evento';
import { FiltrarPorFechaDto } from '../dto/filtrar-por-fecha-dto';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private eventoURL = "http://localhost:8080/api/evento";  // URL del backend

  constructor(private http: HttpClient) { }

  obtenerInformacionEvento(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.eventoURL}/obtener-evento/${id}`);
  }
  filtrarEventosNombre(nombre: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.eventoURL}/filtrar-por-nombre/${nombre}`);
  }
  listarEventos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.eventoURL}/listar-todo-evento`);
  }
  filtrarEventosTipo(tipo: TipoEvento): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.eventoURL}/filtrar-por-tipo/${tipo}`);
  }
  filtrarEventosFecha(filtrarPorFechaDTO: FiltrarPorFechaDto): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.eventoURL}/filtrar-por-fecha`, filtrarPorFechaDTO);
  }
  filtrarEventosCiudad(ciudad: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.eventoURL}/filtrar-por-ciudad/${ciudad}`);
  }
}
