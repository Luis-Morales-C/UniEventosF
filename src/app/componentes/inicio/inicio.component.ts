import { Component } from '@angular/core';
import { EventosService } from '../../servicios/eventos.service';
import { PublicoService } from '../../servicios/publico.service';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoEvento } from '../../dto/tipo-evento';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  eventos: never[];
  resultados: ItemEventoDTO[];
  textoBusqueda: string;
  tiposEvento = TipoEvento;
  hoy: Date = new Date();
  nombre: string;
  ciudades: string[];


  constructor(private route: ActivatedRoute, private router: Router, private publicoService: PublicoService, private eventosService: EventosService) {
    this.eventos = [];
    this.obtenerEventos();
    this.resultados = [];
    this.textoBusqueda = '';
    this.nombre = '';
    this.ciudades = [];
  }

  evento: ItemEventoDTO = {
    id: '',
    nombre: '',
    descripcion: '',
    tipo: '',
    ciudad: '',
    estado: '',
    urlImagenPoster: '',
    fecha: new Date().toISOString(),
    direccion: '',
    selected: false
  };
  public filtrarEventos(nombre: string) {

    if (nombre === '') {
      this.obtenerEventos();
      return;
    }
    this.eventosService.filtrarEventosNombre(nombre).subscribe({
      next: (data) => {
        this.resultados = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    })
  }
  filtrarEventosTipo(tipo: TipoEvento) {
    this.eventosService.filtrarEventosTipo(tipo).subscribe({
      next: (data) => {
        this.resultados = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  filtrarEventosCiudad(ciudad: string) {
    this.eventosService.filtrarEventosCiudad(ciudad).subscribe({
      next: (data) => {
        this.resultados = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  filtrarEventosFecha(fecha: Date) {
    const filtrarPorFechaDto = {
      fechaInicio: new Date(fecha),
      fechaFin: new Date(fecha)
    };
    const dto = filtrarPorFechaDto;

    this.eventosService.filtrarEventosFecha(dto).subscribe({
      next: (data) => {
        this.resultados = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  };


  public obtenerEventos() {
    this.publicoService.listarEventos().subscribe({
      next: (data) => {
        this.resultados = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });

  }
  ngOnInit(): void {
    this.cargarCiudades();
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
      },
      error: (err) => {
        console.error('Error al cargar la información del evento', err);
      }
    });
  }

  cargarCiudades() {
    this.publicoService.listarCiudades().subscribe({
      next: (data) => {
        this.ciudades = data.respuesta; // Asigna los datos a la lista de ciudades
      },
      error: (err) => {
        console.error('Error al cargar ciudades', err);
      }
    });
  }

  abrirEvento(id: String) {
    this.router.navigate(['/evento', id]);
  }

}
