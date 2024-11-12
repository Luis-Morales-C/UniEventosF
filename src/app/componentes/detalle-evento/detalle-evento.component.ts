import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../servicios/eventos.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InformacionEventoDTO } from '../../dto/informacion-evento-dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.css']
})
export class DetalleEventoComponent implements OnInit {

  evento: InformacionEventoDTO = {
    id: '',
    nombre: '',
    descripcion: '',
    direccion: '',
    ciudad: '',
    imagenPortada: '',
    imagenLocalidades: '', // Este debería ser un string si es solo una URL, o un array si es una lista de imágenes.
    tipo: '',
    localidades: [], 
    estado: '',
    fecha: '',
    ubicacion: {
      latitud: 0, 
      longitud: 0
    }
  };

  imagenLocalidadesEsArray: boolean = false; // Nueva propiedad

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.obtenerInformacionEvento(id);
      } else {
        console.error('No se ha proporcionado el ID del evento');
      }
    });
  }

  obtenerInformacionEvento(id: string): void {
    this.eventosService.obtenerInformacionEvento(id).subscribe({
      next: (data) => {
        this.evento = data.respuesta;
        this.imagenLocalidadesEsArray = Array.isArray(this.evento.imagenLocalidades); // Comprobamos si es un array
      },
      error: (err) => {
        console.error('Error al cargar la información del evento', err);
      }
    });
  }
}
