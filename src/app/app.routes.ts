import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { DetalleEventoComponent } from './componentes/detalle-evento/detalle-evento.component';
import { LoginGuard } from './servicios/permiso.service';
import { HistorialComprasComponent } from './componentes/historial-compras/historial-compras.component';
import { RolesGuard } from './servicios/roles.service';
import { ActivarCuentaComponent } from './componentes/activar-cuenta/activar-cuenta.component';
import { CambiarPasswordComponent } from './componentes/cambiar-password/cambiar-password.component';
import { EditarEventoComponent } from './componentes/editar-evento/editar-evento.component';
import { GestionCuponesComponent } from './componentes/gestion-cupones/gestion-cupones.component';
import { CrearCuponComponent } from './componentes/crear-cupones/crear-cupones.component';
import { EditarCuponesComponent } from './componentes/editar-cupones/editar-cupones.component';
import { AdministrarCuentaComponent } from './componentes/administrar-cuenta/administrar-cuenta.component';
import { EventoComponent } from './componentes/evento/evento.component';


export const routes: Routes = [
   { path: '', component: InicioComponent },
   { path: 'crear-evento', component: CrearEventoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'crear-cupones', component: CrearCuponComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'editar-cupon/:id', component: EditarCuponesComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: "gestion-eventos", component: GestionEventosComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: "gestion-cupones", component: GestionCuponesComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: "editar-cuenta", component: AdministrarCuentaComponent },
   { path: "activar-cuenta", component: ActivarCuentaComponent },
   { path: 'detalle-evento/:id', component: DetalleEventoComponent },
   { path: 'editar-evento/:id', component: EditarEventoComponent },
   { path: "historial-compras", component: HistorialComprasComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
   { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
   { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
   { path: 'cambiar-password', component: CambiarPasswordComponent },
   { path: 'evento/:id', component: EventoComponent },
   { path: "**", pathMatch: "full", redirectTo: "" }
];

