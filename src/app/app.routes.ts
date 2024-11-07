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

export const routes: Routes = [
   { path: '', component: InicioComponent },
   { path: 'crear-evento', component: CrearEventoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: "gestion-eventos", component: GestionEventosComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'detalle-evento/:id', component: DetalleEventoComponent },
   { path: 'editar-evento/:id', component: CrearEventoComponent },
   { path: "historial-compras", component: HistorialComprasComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
   { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {  path: 'registro', component: RegistroComponent, canActivate: [LoginGuard]},  
   { path: "**", pathMatch: "full", redirectTo: "" }
];

