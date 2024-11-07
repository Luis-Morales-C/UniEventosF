import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CodigoPasswordDTO } from '../../dto/codigo-password-dto';
import { CambiarPasswordDTO } from '../../dto/cambiar-password-dto';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  cambiarPasswordForm!: FormGroup;
  codigoEnviado: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.crearFormulario();
  }

  public cambiarPassword() {
    const cambiarPasswordDTO = this.cambiarPasswordForm.value as CambiarPasswordDTO;
    
    this.authService.cambiarPassword(cambiarPasswordDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Contraseña cambiada',
          text: 'Tu contraseña ha sido cambiada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/login']);
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

 
  public enviarCodigo() {
    const email = this.cambiarPasswordForm.get('email')?.value;

    if (email) {
      const codigoPasswordDTO: CodigoPasswordDTO = { email };
      
      this.authService.enviarCodigoRecuperacionPassword(codigoPasswordDTO).subscribe({
        next: (data) => {
          this.codigoEnviado = true;
          Swal.fire({
            title: 'Código enviado',
            text: 'Se ha enviado un código a tu correo para confirmar el cambio de contraseña.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo enviar el código al correo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('passwordNueva')?.value;
    const confirmPassword = formGroup.get('confirmNewPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  private crearFormulario() {
    this.cambiarPasswordForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      codigoVerificacion: ['', [Validators.required]],
      passwordNueva: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(8)]]
    }, { 
      validators: this.passwordsMatchValidator });
  }
}
