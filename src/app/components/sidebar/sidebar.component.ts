import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

declare const $: any;
declare interface RouteInfoAdmin {
    path: string;
    title: string;
    icon: string;
    class: string;
    statut: string;
}
export const ROUTES: RouteInfoAdmin[] = [
  //  {path: 'Consulter_réservation', title: 'Réservation', icon: 'Reservation', class: '', statut: 'client'},
    {path: 'About', title: 'About', icon: 'Donut small', class: '', statut: 'client'},
    {path: 'login', title: 'Login', icon: 'library_books', class: '', statut: 'client'},
    {path: 'Gestion_Reservations', title: 'Reservation', icon: 'content_paste', class: '', statut: 'user'},
    {path: 'Gestion_Clients', title: 'Gestion des Clients', icon: 'person', class: '', statut: 'admin'},
    {path: 'Gestion_Types', title: 'Gestion des Types', icon: 'Types', class: '', statut: 'admin'},
    {path: 'Gestion_Localité', title: 'Gestion des Localités', icon: 'location_on', class: '', statut: 'admin'},
    {path: 'Gestion_Vehicules', title: 'Gestion des Véhicules', icon: 'library_books', class: '', statut: 'admin'},
    {path: 'Gestion_Utilisateurs', title: 'Gestion des Utilisateurs', icon: 'content_paste', class: '', statut: 'admin'},
    // {path: 'maps', title: 'Maps', icon: 'location_on', class: '', statut: 'admin'},

];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor(public auth: AuthService) {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
