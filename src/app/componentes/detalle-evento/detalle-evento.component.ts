import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';
import { CommonModule } from '@angular/common';
import { InformacionEventoDTO } from '../../dto/informacion-evento-dto';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.css']
})
export class DetalleEventoComponent {
  codigoEvento: string = '';
  evento: InformacionEventoDTO | undefined;

  constructor(private route: ActivatedRoute, private eventosService: EventosService) {
    this.route.params.subscribe((params) => {
      this.codigoEvento = params['id'];
      this.obtenerEvento();
    });
  }

  public obtenerEvento() {
    this.eventosService.obtenerEvento(this.codigoEvento).subscribe((eventoConsultado) => {
      this.evento = eventoConsultado;
    });
  }
}
