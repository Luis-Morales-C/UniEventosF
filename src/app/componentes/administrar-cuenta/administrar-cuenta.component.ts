import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CuentaService } from '../../servicios/cuenta.service';
import { EditarCuentaDTO } from '../../dto/editar-cuenta-dto';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrar-cuenta',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './administrar-cuenta.component.html',
  styleUrls: ['./administrar-cuenta.component.css']
})
export class AdministrarCuentaComponent implements OnInit {
  editarCuentaForm: FormGroup;

  constructor(private fb: FormBuilder, private cuentaService: CuentaService) {
    this.editarCuentaForm = this.fb.group({
      id: ['', [Validators.required, Validators.maxLength(12)]],
      nombre: ['', [Validators.maxLength(100)]],
      telefonos: this.fb.array([this.fb.control('')], Validators.required),
      direccion: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {}

  get telefonos(): FormArray {
    return this.editarCuentaForm.get('telefonos') as FormArray;
  }

  agregarTelefono(): void {
    this.telefonos.push(this.fb.control(''));
  }

  eliminarTelefono(indice: number): void {
    this.telefonos.removeAt(indice);
  }

  editarCuenta(): void {
    if (this.editarCuentaForm.valid) {
      const cuentaDTO: EditarCuentaDTO = this.editarCuentaForm.value;
      this.cuentaService.editarEvento(cuentaDTO).subscribe({
        next: (respuesta) => {
          Swal.fire('¡Éxito!', respuesta.respuesta, 'success');
        },
        error: (error) => {
          Swal.fire('Error', 'No se pudo actualizar la cuenta', 'error');
        }
      });
    }
  }
}
