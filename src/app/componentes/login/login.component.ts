import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';  // Asegúrate de importar el TokenService
import { LoginDTO } from '../../dto/login-dto';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService 
  ) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]]
    });
  }

  public login() {
    if (this.loginForm.valid) {
      const loginDTO: LoginDTO = this.loginForm.value; 
      this.authService.iniciarSesion(loginDTO).subscribe({
        next: (data) => {
         
          if (data && data.respuesta && data.respuesta.token) {
            
            this.tokenService.login(data.respuesta.token); 
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Has iniciado sesión correctamente.'
            }).then(() => {
            });
          } else {
          
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se recibió el token de autenticación.'
            });
          }
        },
        error: (error) => {
        
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta || 'Error desconocido al intentar iniciar sesión.'
          });
        },
      });
    }
  }
}
