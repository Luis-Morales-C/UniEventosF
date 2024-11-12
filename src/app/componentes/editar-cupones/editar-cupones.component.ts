import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';
import { ActualizarCuponDTO } from '../../dto/actualizar-cupon-dto';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-cupones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-cupones.component.html',
  styleUrls: ['./editar-cupones.component.css']
})
export class EditarCuponesComponent implements OnInit {
  editarCuponForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private administradorService: AdministradorService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.editarCuponForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descuento: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      fechaVencimiento: ['', Validators.required],
      estadoCupon: ['', Validators.required],
      beneficiarios: this.formBuilder.array([])
    });
  }

  get beneficiarios(): FormArray {
    return this.editarCuponForm.get('beneficiarios') as FormArray;
  }

  agregarBeneficiario() {
    const beneficiarioControl = this.formBuilder.control('', Validators.required);
    this.beneficiarios.push(beneficiarioControl);
  }

  eliminarBeneficiario(index: number) {
    this.beneficiarios.removeAt(index);
  }

  editarCupon() {
    if (this.editarCuponForm.invalid) {
      this.editarCuponForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    const actualizarCuponDTO: ActualizarCuponDTO = this.editarCuponForm.value;
    
    this.administradorService.actualizarCupon(actualizarCuponDTO).subscribe({
      next: data => {
        Swal.fire("Éxito", "El cupón ha sido actualizado correctamente", "success");
      },
      error: error => {
        Swal.fire("Error", "No se pudo actualizar el cupón", "error");
      }
    });
  }
}
