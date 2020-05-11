// importar módulos de Router
 import { ModuleWithProviders} from '@angular/core';
 import {Routes, RouterModule} from '@angular/router'

 import {HomeComponent} from './components/home/home.component';

 // Array de rutas
 const appRoutes : Routes = [
     {path : '', component : HomeComponent},
     {path : 'home', component : HomeComponent},
    // {path : 'register',component : RegisterComponent},
    // {path : 'login', component : LoginComponent}
 ];

 // Exportar el modulo de rutas
 export const appRoutingProviders : any[] = [];
 export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);