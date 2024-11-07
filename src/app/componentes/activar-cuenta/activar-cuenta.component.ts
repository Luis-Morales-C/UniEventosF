import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { ActivarCuentaDTO } from '../../dto/activar-cuenta-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './activar-cuenta.component.html',
  styleUrls: ['./activar-cuenta.component.css']
})
export class ActivarCuentaComponent {
  activarCuentaForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.crearFormulario();
  }

  public activarCuenta() {
    const activarCuentaDTO = this.activarCuentaForm.value as ActivarCuentaDTO;

    this.authService.activarCuenta(activarCuentaDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cuenta activada',
          text: 'Su cuenta ha sido activada exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  private crearFormulario() {
    this.activarCuentaForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      codigo: ['', [Validators.required]]
    });
  }
}
