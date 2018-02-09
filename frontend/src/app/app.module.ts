import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { DeviceSettingsComponent } from './components/device-settings/device-settings.component';
import { DevicePageComponent } from './components/device-page/device-page.component';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

import { ValidateService } from './services/validate.service';
import { AuthorizeService } from './services/authorize.service';
import { DevicePipeService } from './services/device-pipe.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'settings/account', component: AccountSettingsComponent, canActivate:[AuthGuard]},
  {path: 'settings/devices', component: DeviceSettingsComponent, canActivate:[AuthGuard]},
  {path: 'device/:id', component: DevicePageComponent, canActivate:[AuthGuard]},

  {path: '404', component: NotFoundComponent},
  {path: '500', component: ServerErrorComponent},
  {path: '**', redirectTo:'/404'}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    AccountSettingsComponent,
    DeviceSettingsComponent,
    AboutComponent,
    DevicePageComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AuthGuard,
    ValidateService,
    AuthorizeService,
    DevicePipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
