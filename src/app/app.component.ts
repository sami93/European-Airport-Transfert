import {Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy, PopStateEvent} from '@angular/common';
import 'rxjs/add/operator/filter';
import {NavbarComponent} from './components/navbar/navbar.component';
import {Router, NavigationEnd, NavigationStart} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import {AccueilComponent} from 'app/Accueil.component';
import {ClientComponent} from './Client/client.component';

declare const $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    show = false;
    @Output() myEvent = new EventEmitter();
    activate() {
       // this.show = true;
        this.myEvent.emit(null);
    }
}
