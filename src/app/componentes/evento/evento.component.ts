import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';
import { InformacionEventoDTO } from '../../dto/informacion-evento-dto';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent implements OnInit {

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
  constructor(private route: ActivatedRoute, private eventoService: EventosService) {
  }

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
    this.eventoService.obtenerInformacionEvento(id).subscribe({
      next: (data) => {
        this.evento = data.respuesta;
        this.imagenLocalidadesEsArray = Array.isArray(this.evento.imagenLocalidades); // Comprobamos si es un array
      },
      error: (err) => {
        console.error('Error al cargar la información del evento', err);
      }
    });
  }

  anadirAlCarrito(evento: any): void {
    // Lógica para añadir el evento al carrito
    console.log('Evento añadido al carrito:', evento);
    alert(`${evento.nombre} añadido al carrito.`);
  }
}
