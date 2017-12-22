import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {ReservationComponent} from './Reservation/Reservation.component';
import {MapsComponent} from './maps/maps.component';
import {ClientComponent} from './Client/client.component';
import {LocaliteComponent} from './Localite/localite.component';
import {VehiculeComponent} from './Vehicule/Vehicule.component';
import {UtilisateurComponent} from './Utilisateur/utilisateur.component';
import {ReservationsComponent} from './Reservations/Reservations.component';
import {ClientService} from './services/Client.service';
import {ReservationsService} from './services/Reservations.service';
import {LocaliteService} from './services/Localite.service';
import {UtilisateurService} from './services/Utilisateur.service';
import {VehiculeService} from './services/Vehicule.service';
import {AccueilComponent} from './Accueil.component';
import {LoginComponent} from './Login/Login.component';
import {AboutComponent} from './About/About.component';
import {LogoutComponent} from './Logout/logout.component';
import {ParticlesModule} from 'angular-particle';
import {TeximateModule} from 'ng-teximate';
import {UrlService} from './services/url.service';
import {TypeComponent} from 'app/Type/Type.component';
import {TypeService} from './services/Type.service';


@NgModule({
    declarations: [
        AppComponent,
        ReservationComponent,
        MapsComponent,
        ClientComponent,
        LocaliteComponent,
        VehiculeComponent,
        UtilisateurComponent,
        ReservationsComponent,
        AccueilComponent,
        LoginComponent,
        AboutComponent,
        LogoutComponent,
        TypeComponent


    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        FormsModule,
        SharedModule,
        ComponentsModule,
        DataTablesModule,
        RouterModule,
        AppRoutingModule,
        ParticlesModule,
        TeximateModule,
    ],
    providers: [ClientService,
        ReservationsService,
        LocaliteService,
        UtilisateurService,
        VehiculeService,
        AuthService,
        AuthGuardLogin,
        AuthGuardAdmin,
        UserService,
        UrlService,
        TypeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
