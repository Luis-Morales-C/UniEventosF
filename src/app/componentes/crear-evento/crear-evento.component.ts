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
import { ImagenesService } from '../../servicios/imagenes.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {
  tiposDeEvento: string[];
  estados: string[];
  crearEventoForm!: FormGroup;
  ciudades: string[];
  imagenPortada?: File;
  imagenLocalidades?: File;
  

  private tokenService: TokenService;
  constructor(
    private formBuilder: FormBuilder, 
    private eventosService: EventosService, 
    private publicoService: PublicoService,
    private administradorService: AdministradorService,
    private imagenService: ImagenesService,
    tokenService: TokenService
  ) {
 
    this.tokenService = tokenService;
    
    this.crearFormulario();
    this.tiposDeEvento = [];
    this.ciudades = [];
    this.estados = [];
    this.listarCiudades();
    this.listarTipos();
    this.listarEstado();

    this.crearEventoForm.patchValue({
      idUsuario: this.tokenService.getIDCuenta()
    });
  }

  
  public crearEvento() {
    if (this.crearEventoForm.invalid) {
      this.crearEventoForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor completa todos los campos.',
      });
      return;
    }
  
    const crearEventoDTO = this.crearEventoForm.value as CrearEventoDTO;
  
    console.log('Datos del evento a crear:', crearEventoDTO);
  
    this.administradorService.crearEvento(crearEventoDTO).subscribe({
      next: data => {
        Swal.fire("Éxito!", "Se ha creado un nuevo evento.", "success");
      
        this.crearEventoForm.reset({
          idUsuario: this.tokenService.getIDCuenta()
        });
        
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
      idUsuario: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      imagenPortada: ['', [Validators.required]],
      imagenLocalidades: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      localidades: this.formBuilder.array([]),
      estado: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      ubicacion: this.formBuilder.group({
        latitud: ['', Validators.required],
        longitud: ['', Validators.required]
      })
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

  public listarEstado() {
    this.publicoService.listarEstados().subscribe({
      next: (data) => {
        this.estados = data.respuesta;
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


    this.imagenService.subirImagen(formData).subscribe({
      next: (data) => {
        this.crearEventoForm.get(formControl)?.setValue(data.respuesta);
        Swal.fire("Exito!", "Se ha subido la imagen.", "success");
      },
      error: (error) => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });

  }
  
  public eliminarImagen(tipo: string) {
    let idImagen = tipo === 'portada' ? this.crearEventoForm.get('imagenPortada')?.value : this.crearEventoForm.get('imagenLocalidades')?.value;

  
    if (idImagen.includes("https://")) {
        const urlParts = idImagen.split("/");
        idImagen = urlParts[urlParts.length - 1].split("?")[0]; 
    }

    console.log("Intentando eliminar imagen con nombre de archivo:", idImagen);

    if (!idImagen) {
      Swal.fire("Error!", "No hay imagen para eliminar.", "error");
      return;
    }
  
    this.imagenService.eliminarImagen(idImagen).subscribe({
      next: () => {
        Swal.fire("Éxito!", "La imagen ha sido eliminada.", "success");
        
        if (tipo === 'portada') {
          this.crearEventoForm.get('imagenPortada')?.setValue('');
        } else {
          this.crearEventoForm.get('imagenLocalidades')?.setValue('');
        }
      },
      error: (error) => {
        console.log("Error al intentar eliminar la imagen:", error); 
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
}
}