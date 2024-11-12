import { EstadoCupon } from "./estado-cupon";
export interface ActualizarCuponDTO {
  id: string; 
  nombre: string;
  descuento: number;
  fechaVencimiento: string; 
  beneficiarios: string[];
  estadoCupon: string;
}
