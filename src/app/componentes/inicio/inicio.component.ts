import { Component } from '@angular/core';
import { PublicoService } from '../../servicios/publico.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  eventos: never[];


  constructor(private publicoService: PublicoService) {
    this.eventos = [];
    this.obtenerEventos();
  }

  public obtenerEventos() {
    this.publicoService.listarEventos().subscribe({
      next: (data) => {
        this.eventos = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

}
