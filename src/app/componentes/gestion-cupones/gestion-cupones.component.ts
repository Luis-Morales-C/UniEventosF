import { Component } from '@angular/core';
import { AdministradorService } from '../../servicios/administrador.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ItemCuponDTO } from '../../dto/item-cupon-dto';
import { PublicoService } from '../../servicios/publico.service';

@Component({
  selector: 'app-gestion-cupones',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './gestion-cupones.component.html',
  styleUrls: ['./gestion-cupones.component.css']
})
export class GestionCuponesComponent {
  cupones: ItemCuponDTO[] = [];
  textoBtnEliminar: string = '¿Estás seguro de eliminar?';
  seleccionados: ItemCuponDTO[] = [];

  constructor(private administradorService: AdministradorService, private publicoService:PublicoService) {
    this.listarCupones(); 
   
    
  }


  public listarCupones() {
    this.administradorService.listarCuponesAdmin().subscribe({
      next: (data) => {
        console.log(data.respuesta);  
        this.cupones = data.respuesta;
      },
      error: (error) => {
        console.error('Error al cargar cupones:', error);
      }
    });
  }


  public seleccionar(cupon: ItemCuponDTO, event: any) {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      if (!this.seleccionados.includes(cupon)) {
        this.seleccionados.push(cupon);
      }
    } else {
      this.seleccionados = this.seleccionados.filter(item => item.id !== cupon.id);
    }

    this.actualizarMensaje();
  }

  public seleccionarTodos(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      this.seleccionados = [...this.cupones];
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
      text: "Esta acción eliminará los cupones seleccionados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarCupones();  
        Swal.fire("Eliminados!", "Los cupones seleccionados han sido eliminados.", "success");
      }
    });
  }

  public eliminarCupones() {
    this.seleccionados.forEach((cupon) => {
      if (typeof cupon.id === 'string') {
        this.administradorService.eliminarCupon(cupon.id).subscribe({
          next: (response) => {
            console.log('Cupón eliminado', response);
          },
          error: (error) => {
            console.error('Error al eliminar el cupón:', error);
          }
        });
      }

      this.cupones = this.cupones.filter((c) => c.id !== cupon.id);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

}
