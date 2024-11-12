export interface CrearCuponDTO {
    codigo: string;
    nombre: string;
    estado: string;
    descuento: number;
    fechaVencimiento: Date; 
    tipo: string;         
    beneficiarios: string[]; 
}
