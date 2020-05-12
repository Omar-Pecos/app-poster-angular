// importar módulos de Router
 import { ModuleWithProviders} from '@angular/core';
 import {Routes, RouterModule} from '@angular/router'

 import {HomeComponent} from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';

 // Array de rutas
 const appRoutes : Routes = [
     {path : '',redirectTo: 'home/inicio', pathMatch: 'full'},
     {path : 'home/:route', component : HomeComponent},
     {path: 'categorias', component : CategoriesComponent},
     {path : 'blog/:filter/:value', component : BlogComponent},
     {path : 'post/:id' , component : PostComponent}
    // {path : 'register',component : RegisterComponent},
    // {path : 'login', component : LoginComponent}
 ];

 // Exportar el modulo de rutas
 export const appRoutingProviders : any[] = [];
 export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);