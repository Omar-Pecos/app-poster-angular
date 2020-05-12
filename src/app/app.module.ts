import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {routing, appRoutingProviders} from './app.routing'

//ngx-toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//moment
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {HeaderComponent} from './components/header/header.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SliderComponent } from './components/slider/slider.component';
import { BlogComponent } from './components/blog/blog.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    PostsComponent,
    PostComponent,
    CategoriesComponent,
    SidebarComponent,
    SliderComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar : true,
      progressAnimation : 'increasing'
    }),
    MomentModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
