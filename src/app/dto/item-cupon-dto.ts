import { TipoCupon } from "./tipo-cupon";
export interface ItemCuponDTO {
    id: string;
    codigo: string;
    nombre: string;
    descuento: number;
    fechaVencimiento: string; 
    tipoCupon: TipoCupon; 
    selected?: boolean; 
  }