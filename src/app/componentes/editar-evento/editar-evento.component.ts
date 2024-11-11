import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';  
import { EditarEventoDTO } from '../../dto/editar-evento-dto';
import { InformacionEventoDTO } from '../../dto/informacion-evento-dto';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {
  tiposDeEvento: string[] = [];
  estados: string[] = [];
  editarEventoForm!: FormGroup;
  ciudades: string[] = [];
  imagenPortada?: File;
  imagenLocalidades?: File;
  eventoId: string;

  constructor(
    private formBuilder: FormBuilder, 
    private eventosService: EventosService, 
    private publicoService: PublicoService,
    private administradorService: AdministradorService,
    private imagenService: ImagenesService,
    private tokenService: TokenService,
    private route: ActivatedRoute 
  ) {
   
    this.eventoId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.crearFormulario();
    this.listarCiudades();
    this.listarTipos();
    this.listarEstado();
    this.cargarEvento();
}

private cargarEvento() {
  this.eventosService.obtenerEvento(this.eventoId).subscribe({
    next: (evento: InformacionEventoDTO) => {
      console.log('Datos del evento recibidos:', evento);
      this.editarEventoForm.patchValue({
        idEvento: this.eventoId,
        nombre: evento.nombre,
        descripcion: evento.descripcion,
        direccion: evento.direccion,
        ciudad: evento.ciudad,
        tipo: evento.tipo,
        estado: evento.estado,
        fecha: evento.fecha,
        ubicacion: {
          latitud: evento.ubicacion.latitud,
          longitud: evento.ubicacion.longitud
        }
      });

      evento.localidades.forEach(localidad => {
        const localidadFormGroup = this.formBuilder.group({
          nombre: [localidad.nombre, Validators.required],
          precio: [localidad.precio, Validators.required],
          capacidadMaxima: [localidad.capacidad, Validators.required]
        });
        this.localidades.push(localidadFormGroup);
      });
    },
    error: (error) => {
      console.error('Error al cargar el evento:', error);
    }
  });
}

  private crearFormulario() {
    this.editarEventoForm = this.formBuilder.group({
      idUsuario: [this.tokenService.getIDCuenta(), [Validators.required]],
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
  

  public editarEvento() {
    if (this.editarEventoForm.invalid) {
      this.editarEventoForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor completa todos los campos.',
      });
      return;
    }

    const editarEventoDTO = this.editarEventoForm.value as EditarEventoDTO;

    console.log('Datos del evento a editar:', editarEventoDTO);

    this.administradorService.editarEvento(editarEventoDTO).subscribe({
      next: data => {
        Swal.fire("Éxito!", "El evento ha sido editado correctamente.", "success");
      },
      error: error => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
  }

  trackByFn(index: number, item: string): any {
    return item;
  }

  get localidades(): FormArray {
    return this.editarEventoForm.get('localidades') as FormArray;
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
        this.editarEventoForm.get(formControl)?.setValue(data.respuesta);
        Swal.fire("Éxito!", "La imagen ha sido subida correctamente.", "success");
      },
      error: (error) => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
  }

  public eliminarImagen(tipo: string) {
    let idImagen = tipo === 'portada' ? this.editarEventoForm.get('imagenPortada')?.value : this.editarEventoForm.get('imagenLocalidades')?.value;

    if (idImagen.includes("https://")) {
        const urlParts = idImagen.split("/");
        idImagen = urlParts[urlParts.length - 1].split("?")[0];
    }

    if (!idImagen) {
      Swal.fire("Error!", "No hay imagen para eliminar.", "error");
      return;
    }

    this.imagenService.eliminarImagen(idImagen).subscribe({
      next: () => {
        Swal.fire("Éxito!", "La imagen ha sido eliminada.", "success");
        
        if (tipo === 'portada') {
          this.editarEventoForm.get('imagenPortada')?.setValue('');
        } else {
          this.editarEventoForm.get('imagenLocalidades')?.setValue('');
        }
      },
      error: (error) => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
  }
}