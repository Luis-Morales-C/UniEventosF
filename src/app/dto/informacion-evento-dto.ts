import { LocalidadDTO } from "./localidad-dto";
import { UbicacionDTO } from "./ubicacion-dto";

export interface InformacionEventoDTO {
    id: string;
    nombre: string;
    descripcion: string;
    direccion: string;
    ciudad: string;
    imagenPortada: string;
    imagenLocalidades: string;
    tipo: string;
    localidades: LocalidadDTO[];
    estado: string;
    fecha: string; 
    ubicacion: UbicacionDTO;
}