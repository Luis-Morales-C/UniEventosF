import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';
import { CrearCuponDTO } from '../../dto/crear-cupon-dto';
import Swal from 'sweetalert2';
import { TokenService } from '../../servicios/token.service';
import { PublicoService } from '../../servicios/publico.service';

@Component({
  selector: 'app-crear-cupon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './crear-cupones.component.html',
  styleUrls: ['./crear-cupones.component.css']
})
export class CrearCuponComponent {
  crearCuponForm!: FormGroup;
  tiposCupon: string[] = [];  
  beneficiarios: string[] = [];  
  estados: string[]=[];
  private tokenService: TokenService;

  constructor(
    private formBuilder: FormBuilder,
    private cuponService: AdministradorService,
    tokenService: TokenService,
    private publicoService: PublicoService
  ) {
    this.tokenService = tokenService;
    this.crearFormulario();
    this.listarEstadosCupon();
    this.listarTipoCupon();
  }

  private crearFormulario() {
    this.crearCuponForm = this.formBuilder.group({
      codigo: ['', [Validators.minLength(5), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      estado: ['', [Validators.required]],
      descuento: ['', [Validators.required, Validators.min(1), Validators.max(100)]],  
      fechaVencimiento: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      beneficiarios: this.formBuilder.array([]),
    });
  }


  agregarBeneficiario() {
    this.beneficiarios.push(''); 
  }

  eliminarBeneficiario(index: number) {
    this.beneficiarios.splice(index, 1);
  }

 
  crearCupon() {
    
    const crearCuponDTO = this.crearCuponForm.value as CrearCuponDTO;

    console.log('Datos del cupón a crear:', crearCuponDTO);

    this.cuponService.crearCupon(crearCuponDTO).subscribe({
      next: data => {
        Swal.fire("Éxito!", "Se ha creado un nuevo cupón.", "success");
        this.crearCuponForm.reset();
      },
      error: error => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
  }
  public listarEstadosCupon() {
    this.publicoService.listarEstadosCupon().subscribe({
      next: (data) => {
        this.tiposCupon = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  public listarTipoCupon() {
    this.publicoService.listarTipoCupon().subscribe({
      next: (data) => {
        this.estados = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

