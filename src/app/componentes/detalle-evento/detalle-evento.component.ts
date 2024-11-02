import { Component } from '@angular/core';
import { EventoDTO } from '../../dto/evento-dto';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';
import { CommonModule } from '@angular/common';


@Component({
 selector: 'app-detalle-evento',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './detalle-evento.component.html',
 styleUrl: './detalle-evento.component.css'
})
export class DetalleEventoComponent {


 codigoEvento: string = '';
 evento: EventoDTO | undefined;


 constructor(private route: ActivatedRoute, private eventosService: EventosService) {
   this.route.params.subscribe((params) => {
     this.codigoEvento = params['id'];
     this.obtenerEvento();
   });
 }


 public obtenerEvento() {
   const eventoConsultado = this.eventosService.obtener(this.codigoEvento);
   if (eventoConsultado != undefined) {
     this.evento = eventoConsultado;
   }
 }

 <div class="container mt-5">
    <div class="card">
        <div class="card-header text-center">
            <h5 class="mb-0"><i class="fa-solid fa-ticket"></i> Detalle del Evento</h5>
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ evento?.nombre }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Tipo: {{ evento?.tipo }}</h6>
            <img *ngIf="evento?.imagenPortada" [src]="evento.imagenPortada" class="card-img-top" alt="{{ evento?.nombre }}">
            <p class="card-text mt-3"><strong>Ciudad:</strong> {{ evento?.ciudad }}</p>
            <p class="card-text"><strong>Fecha:</strong> {{ evento?.fecha | date:'fullDate' }}</p>
            <p class="card-text"><strong>Estado:</strong> {{ evento?.estado }}</p>
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary" routerLink="/gestion-eventos">
                    <i class="fa-solid fa-arrow-left me-1"></i> Volver
                </button>
                <button class="btn btn-danger" (click)="confirmarEliminacion()">
                    <i class="fa-solid fa-trash me-1"></i> Eliminar
                </button>
            </div>
        </div>
    </div>
</div>



}

