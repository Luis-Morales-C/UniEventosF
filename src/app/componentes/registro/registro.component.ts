import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { CrearCuentaDTO } from '../../dto/crear-cuenta-dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router:Router) {
    this.crearFormulario();
  }
  public registrar() {
    const crearCuenta = this.registroForm.value as CrearCuentaDTO;
  
    crearCuenta.telefonos = crearCuenta.telefonos.map((telefono: string) => telefono.toString().trim());
  
    console.log(crearCuenta); 
  
    this.authService.crearCuenta(crearCuenta).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cuenta creada',
          text: 'La cuenta se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
   
          this.router.navigate(['/activar-cuenta']);  
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta || 'Ha ocurrido un error inesperado',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
  
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;
    return password == confirmaPassword ? null : { passwordsMismatch: true };
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefonos: this.formBuilder.array([this.crearTelefono()]),  // Array de strings
      password: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(8)]],
      confirmaPassword: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(8)]]
    },
    { validators: this.passwordsMatchValidator });
  }

  

  private crearTelefono(): FormControl {
    return this.formBuilder.control('', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]);
  }

  get telefonos(): FormArray {
    return this.registroForm.get('telefonos') as FormArray;
  }

  public agregarTelefono() {
    this.telefonos.push(this.crearTelefono());
  }

  public eliminarTelefono(indice: number) {
    this.telefonos.removeAt(indice);
  }
}
