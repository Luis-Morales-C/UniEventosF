import { Component } from '@angular/core';
import { EventosService } from '../../servicios/eventos.service';
import { RouterModule } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { CommonModule } from '@angular/common';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-eventos',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule],
  templateUrl: './gestion-eventos.component.html',
  styleUrls: ['./gestion-eventos.component.css']
})
export class GestionEventosComponent {
  eventos: ItemEventoDTO[] = []; 
  textoBtnEliminar: string = '¿Estás seguro de eliminar?'; 
  seleccionados: ItemEventoDTO[] = [];

  constructor(
    private eventosService: EventosService,
    private administradorService: AdministradorService
  ) {
    this.listarEventos();  
  }

  public listarEventos() {
    this.administradorService.listarEventosAdmin().subscribe({
      next: (data) => {
        console.log(data.respuesta);  
        this.eventos = data.respuesta;
      },
      error: (error) => {
        console.error('Error al cargar eventos:', error);
      },
    });
  }

  public seleccionar(evento: ItemEventoDTO, event: any) {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      if (!this.seleccionados.includes(evento)) {
        this.seleccionados.push(evento);
      }
    } else {
      this.seleccionados = this.seleccionados.filter(item => item.id !== evento.id);
    }

    this.actualizarMensaje();
  }

  public seleccionarTodos(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      this.seleccionados = [...this.eventos];
    } else {
      this.seleccionados = [];
    }

    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam !== 0) {
      this.textoBtnEliminar = tam === 1 ? "1 elemento" : `${tam} elementos`; 
    } else {
      this.textoBtnEliminar = '';  
    }
  }

  public confirmarEliminacion() {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción cambiará el estado de los eventos a Inactivos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarEventos();  
        Swal.fire("Eliminados!", "Los eventos seleccionados han sido eliminados.", "success");
      }
    });
  }

  public eliminarEventos() {
    this.seleccionados.forEach((evento) => {
      if (typeof evento.id === 'string') {
        this.administradorService.eliminarEvento(evento.id); 
      }
      this.eventos = this.eventos.filter((e) => e.id !== evento.id);  
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }
}
