import { LocalidadDTO } from "./localidad-dto";
import { UbicacionDTO } from "./ubicacion-dto";

export interface EditarEventoDTO {
    id: string;
    nombre: string;
    descripcion: string;
    direccion: string;
    imagenPortada: string;
    imagenLocalidades: string;
    tipo: string;
    localidades: LocalidadDTO[];
    estado: string;
    fecha: string;
    ubicacion: UbicacionDTO;
  }
