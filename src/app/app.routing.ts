// importar módulos de Router
 import { ModuleWithProviders} from '@angular/core';
 import {Routes, RouterModule} from '@angular/router'

 import {HomeComponent} from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ErrorComponent } from './components/error/error.component';
import { SearchComponent } from './components/search/search.component';
import { LibraryComponent } from './components/library/library.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';

 // Array de rutas
 const appRoutes : Routes = [
     {path : '',redirectTo: 'home/inicio', pathMatch: 'full'},
     {path : 'home/:route', component : HomeComponent},
     {path: 'categorias', component : CategoriesComponent},
     {path : 'blog/:filter/:value', component : BlogComponent},
     {path : 'post/:id' , component : PostComponent},
     {path : 'crear', component : CreateComponent},
     {path : 'editar/:id', component : EditComponent},
     {path : 'buscar/:search', component : SearchComponent},
     {path : 'biblioteca', component : LibraryComponent},
     {path : 'perfil/:id' , component : ProfileComponent},
     {path : 'usuarios', component : UsersComponent},
     {path : 'error/:code' , component : ErrorComponent},
     {path : '**' , component : ErrorComponent},
     
    // {path : 'register',component : RegisterComponent},
    // {path : 'login', component : LoginComponent}
 ];

 // Exportar el modulo de rutas
 export const appRoutingProviders : any[] = [];
 export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);