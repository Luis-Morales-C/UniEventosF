import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'] 
})
export class RegistroComponent {
  registroForm!: FormGroup; 

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario(); 
  }
  
  public registrar() {
    console.log(this.registroForm.value);
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
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]]
    },
    { validators: this.passwordsMatchValidator } as AbstractControlOptions
  );
}
}


