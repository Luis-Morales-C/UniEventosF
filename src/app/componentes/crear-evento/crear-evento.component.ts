import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {
   tiposDeEvento: string[];
   crearEventoForm!: FormGroup;

   constructor(private formBuilder: FormBuilder) {
     this.crearFormulario();
     this.tiposDeEvento = ['Concierto', 'Fiesta', 'Teatro', 'Deportes'];
   }

   public crearEvento() {
     console.log(this.crearEventoForm.value);
   }

   trackByFn(index: number, item: string): any {
    return item;
  }

   private crearFormulario() {
     this.crearEventoForm = this.formBuilder.group({
       nombre: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(50)]],
       descripcion: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(200)]],
       tipo: ['', [Validators.required]],
       direccion: ['', [Validators.required]],
       ciudad: ['', [Validators.required]],
       localidades: this.formBuilder.array([]), 
       imagenPortada: ['', [Validators.required]],
       imagenLocalidades: ['', [Validators.required]]
     });
   }

   get localidades(): FormArray {
     return this.crearEventoForm.get('localidades') as FormArray;
   }

   agregarLocalidad() {
     const localidadFormGroup = this.formBuilder.group({
       nombre: ['', Validators.required],
       precio: ['', Validators.required],
       capacidadMaxima: ['', Validators.required]
     });
     this.localidades.push(localidadFormGroup);
   }

 
   eliminarLocalidad(indice: number) {
     this.localidades.removeAt(indice);
   }

   public onFileChange(event: any, tipo: string) {
     if (event.target.files.length > 0) {
       const file = event.target.files[0];
       switch (tipo) {
         case 'localidades':
           this.crearEventoForm.get('imagenLocalidades')?.setValue(file);
           break;
         case 'portada':
           this.crearEventoForm.get('imagenPortada')?.setValue(file);
           break;
       }
     }
   }
}
