import { Localidad } from "./localidad"
import { Ubicacion } from "./ubicacion"
export interface EditarEventoDTO {
    id: string;
    nombre: string;
    descripcion: string;
    direccion: string;
    imagenPortada: string;
    imagenLocalidades: string;
    tipo: string;
    localidades: Localidad[];
    estado: string;
    fecha: string;
    ubicacion: Ubicacion;
  }
