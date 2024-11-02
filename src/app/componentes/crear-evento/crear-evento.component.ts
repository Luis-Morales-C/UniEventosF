import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EventosService } from '../../servicios/eventos.service';
import { EventoDTO } from '../../dto/evento-dto';
import Swal from 'sweetalert2';
import { PublicoService } from '../../servicios/publico.service';
import { AdministradorService } from '../../servicios/administrador.service';
import { CrearEventoDTO } from '../../dto/crear-evento-dto';

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
  ciudades: string[];
  imagenPortada?: File;
  imagenLocalidades?: File;

  constructor(private formBuilder: FormBuilder, private eventosService: EventosService, private publicoService: PublicoService, private administradorService: AdministradorService) {
    this.crearFormulario();
    this.tiposDeEvento = ['Concierto', 'Fiesta', 'Teatro', 'Deportes'];
    this.ciudades = [];
    this.listarCiudades();
    this.listarTipos();



  }

  public crearEvento() {


    const crearEventoDTO = this.crearEventoForm.value as CrearEventoDTO;


    this.administradorService.crearEvento(crearEventoDTO).subscribe({
      next: data => {
        Swal.fire("Exito!", "Se ha creado un nuevo evento.", "success");
      },
      error: error => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });


  }


  trackByFn(index: number, item: string): any {
    return item;
  }

  private crearFormulario() {
    this.crearEventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
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
      tipo == 'localidades' ? (this.imagenLocalidades = file) : (this.imagenPortada = file);
    }
  }

  public listarTipos() {
    this.publicoService.listarTipos().subscribe({
      next: (data) => {
        this.tiposDeEvento = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  public listarCiudades() {
    this.publicoService.listarCiudades().subscribe({
      next: (data) => {
        this.ciudades = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }


  public subirImagen(tipo: string) {
    const formData = new FormData();
    const imagen = tipo == 'portada' ? this.imagenPortada : this.imagenLocalidades;
    const formControl = tipo == 'portada' ? 'imagenPortada' : 'imagenLocalidades';


    formData.append('imagen', imagen!);


    this.administradorService.subirImagen(formData).subscribe({
      next: (data) => {
        this.crearEventoForm.get(formControl)?.setValue(data.respuesta);
        Swal.fire("Exito!", "Se ha subido la imagen.", "success");
      },
      error: (error) => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });


  }


}
