import { Injectable, inject } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private imagenURL = "http://localhost:8080/api/imagenes";

  constructor(private http: HttpClient) { }

  public subirImagen(imagen: FormData): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.imagenURL}/subir`, imagen);
  }
  public eliminarImagen(idImagen: String): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.imagenURL}/eliminar?idImagen=${idImagen}`);
  }
  
}
