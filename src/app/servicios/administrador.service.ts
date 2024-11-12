import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearEventoDTO } from '../dto/crear-evento-dto';
import { EditarEventoDTO } from '../dto/editar-evento-dto';
import { CrearCuponDTO } from '../dto/crear-cupon-dto';
import { ActualizarCuponDTO } from '../dto/actualizar-cupon-dto';


@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private adminURL = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) { }

  public crearEvento(crearEventoDTO: CrearEventoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-evento`, crearEventoDTO);
  }


  public editarEvento(editarEventoDTO: EditarEventoDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/editar-evento`, editarEventoDTO);
  }

  public eliminarEvento(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-evento/${id}`);
  }

  public obtenerEvento(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener/${id}`);
  }

  public listarEventosAdmin(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-todo-evento`);
  }

  public listarCuponesAdmin(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-cupones`);
  }

  public crearCupon(crearCuponDTO:CrearCuponDTO ): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-cupon`,crearCuponDTO);
  }

  public actualizarCupon(actualizarCuponDTO: ActualizarCuponDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/actualizar-cupon`, actualizarCuponDTO);
  }

  public eliminarCupon(idCupon: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.adminURL}/borrar-cupon/${idCupon}`);
  }





}
