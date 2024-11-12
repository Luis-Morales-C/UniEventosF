import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';
import { CrearCuponDTO } from '../../dto/crear-cupon-dto';
import Swal from 'sweetalert2';
import { TokenService } from '../../servicios/token.service';
import { PublicoService } from '../../servicios/publico.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-cupon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-cupones.component.html',
  styleUrls: ['./crear-cupones.component.css']
})
export class CrearCuponComponent {
  crearCuponForm!: FormGroup;
  tiposCupon: string[] = [];
  estados: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cuponService: AdministradorService,
    private tokenService: TokenService,
    private publicoService: PublicoService
  ) {
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

  get beneficiarios(): FormArray {
    return this.crearCuponForm.get('beneficiarios') as FormArray;
  }

  agregarBeneficiario() {
    const beneficiarioForm = this.formBuilder.group({
      beneficiario: ['', Validators.required],
    });
    this.beneficiarios.push(beneficiarioForm);
  }

  eliminarBeneficiario(index: number) {
    this.beneficiarios.removeAt(index);
  }

  crearCupon() {
    const formValue = this.crearCuponForm.value;
    const crearCuponDTO: CrearCuponDTO = {
      ...formValue,
      fechaVencimiento: new Date(formValue.fechaVencimiento).toISOString(),
      beneficiarios: formValue.beneficiarios.map((b: any) => b.beneficiario),
    };

    this.cuponService.crearCupon(crearCuponDTO).subscribe({
      next: data => {
        Swal.fire("Éxito!", "Se ha creado un nuevo cupón.", "success");
        this.crearCuponForm.reset();
        this.beneficiarios.clear();
      },
      error: error => {
        const mensajeError = typeof error.error.respuesta === 'string'
          ? error.error.respuesta
          : JSON.stringify(error.error.respuesta);
        Swal.fire("Error!", mensajeError, "error");
      }
    });
  }

  public listarEstadosCupon() {
    this.publicoService.listarEstadosCupon().subscribe({
      next: data => {
        this.estados = data.respuesta;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  public listarTipoCupon() {
    this.publicoService.listarTipoCupon().subscribe({
      next: data => {
        this.tiposCupon = data.respuesta;
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
