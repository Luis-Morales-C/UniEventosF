import { Localidad } from "./localidad"
import { Ubicacion } from "./ubicacion"

export interface CrearEventoDTO {
    idUsuario: string;
    nombre: string;
    descripcion: string;
    direccion: string;
    ciudad: string;
    imagenPortada: string;
    imagenLocalidades: string;
    tipo: string;
    localidades: Localidad[];
    estado: string;
    fecha: string;  
    ubicacion: Ubicacion;
}
