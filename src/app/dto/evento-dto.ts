import { Localidad } from "./localidad"
import { Ubicacion } from "./ubicacion"
export interface EventoDTO {
   id:string,
   nombre:string,
   descripcion:string,
   fecha:Date,
   tipo:string,
   direccion:string,
   ciudad:string,
   localidades:Localidad[],
   imagenPortada:string,
   imagenLocalidades:string,
   estado:string
   ubicacion:Ubicacion
}

