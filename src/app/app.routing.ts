import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {ReservationComponent} from './Reservation/Reservation.component';
import {MapsComponent} from './maps/maps.component';
import {ClientComponent} from './Client/client.component';
import {LocaliteComponent} from './Localite/localite.component';
import {VehiculeComponent} from './Vehicule/Vehicule.component';
import {UtilisateurComponent} from 'app/Utilisateur/utilisateur.component';
import {ReservationsComponent} from './Reservations/Reservations.component';
import {AppComponent} from './app.component';
import {AccueilComponent} from './Accueil.component';
import {AboutComponent} from './About/About.component';
import {LoginComponent} from 'app/Login/Login.component';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {LogoutComponent} from './Logout/logout.component';
import {TypeComponent} from './Type/Type.component';

const routes: Routes = [
    {path: 'About', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'Consulter_réservation', component: ReservationComponent},
    {path: 'Gestion_Reservations', component: ReservationsComponent, canActivate: [AuthGuardLogin]},
    {path: 'Gestion_Clients', component: ClientComponent,  canActivate: [AuthGuardAdmin]},
    {path: 'Gestion_Types', component: TypeComponent,  canActivate: [AuthGuardAdmin]},
    {path: 'Gestion_Localité', component: LocaliteComponent,  canActivate: [AuthGuardAdmin]},
    {path: 'Gestion_Vehicules', component: VehiculeComponent,  canActivate: [AuthGuardAdmin]},
    {path: 'Gestion_Utilisateurs', component: UtilisateurComponent,  canActivate: [AuthGuardAdmin]},
    {path: 'maps', component: MapsComponent},
    {path: '', redirectTo: 'About', pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
