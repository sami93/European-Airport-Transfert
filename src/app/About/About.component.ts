import {Component, OnInit, ViewChild} from '@angular/core';
import * as Chartist from 'chartist';
import {TeximateComponent, TeximateHover, TeximateOptions, TeximateOrder} from 'ng-teximate';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ClientService} from '../services/Client.service';
import swal from 'sweetalert2';
import {VehiculeService} from '../services/Vehicule.service';
import {TypeService} from '../services/Type.service';
import {LocaliteService} from '../services/Localite.service';
import {ReservationsService} from '../services/Reservations.service';
@Component({
    selector: 'app-about',
    templateUrl: './About.component.html',
    styleUrls: ['./About.component.css']
})
export class AboutComponent implements OnInit {
    text = 'Européan Airport Transfert';

    effectOptions: TeximateOptions = {
        type: 'letter',
        animation: {name: 'zoomInLeft', duration: 1000},
        word: {type: TeximateOrder.SHUFFLE, delay: 100},
        letter: {type: TeximateOrder.SHUFFLE, delay: 50}
    };

    hoverOptions: TeximateHover = {
        type: 'letter',
        in: 'zoomOutUp',
        out: 'bounceInDown'
    };

    // another way to apply an effect using component reference

    ContactForm: FormGroup;
    commentaire = new FormControl('', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]);
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;
    diffOptions: any;
    Liste_clientsTop5: any[];
    Liste_vehiculesTop5: any[];
    Reservation: any = {};
    addReservation: FormGroup;
    nom_client = new FormControl('', Validators.required);
    adresse_client = new FormControl('', Validators.required);
    tel_client = new FormControl('', Validators.required);
    mail_client = new FormControl('', Validators.required);
    Date_arrivée = new FormControl('', Validators.required);
    destination = new FormControl('', Validators.required);
    heure_de_arrivée = new FormControl('', Validators.required);
    nbr_voyageur = new FormControl('', Validators.required);
    matricule_veh = new FormControl('', Validators.required);
    marque_veh = new FormControl('', Validators.required);
    puissance_veh = new FormControl('', Validators.required);
    nombre_place = new FormControl('', Validators.required);
    nom_type = new FormControl('', Validators.required);
    tarif = new FormControl('', Validators.required);
    nom_local = new FormControl('', Validators.required);

    constructor(private auth: AuthService,
                private formBuilder: FormBuilder,
                private clientService: ClientService,
                private vehiculeService: VehiculeService,
                private TypeService: TypeService,
                private localiteService: LocaliteService,
                private ReservationsService: ReservationsService) {
    }

    Reservation_Add() {
        console.log(this.addReservation.value);
        let clientjson = {};
        let localitejson = {};
        let typejson = {};
        let vehiculejson = {};
        let reservationsjson = {};

        clientjson['nom_client'] = this.addReservation.value.nom_client;
        clientjson['adresse_client'] = this.addReservation.value.adresse_client;
        clientjson['tel_client'] = this.addReservation.value.tel_client;
        clientjson['mail_client'] = this.addReservation.value.mail_client;

        localitejson['nom_local'] = this.addReservation.value.nom_local;

        typejson['nom_type'] = this.addReservation.value.nom_type;
        typejson['tarif'] = this.addReservation.value.tarif;


        vehiculejson['matricule_veh'] = this.addReservation.value.matricule_veh;
        vehiculejson['marque_veh'] = this.addReservation.value.marque_veh;
        vehiculejson['puissance_veh'] = this.addReservation.value.puissance_veh;

        console.log(clientjson);
        console.log(localitejson);
        console.log(typejson);
        this.clientService.client_add(clientjson).subscribe(res => {
            console.log(typeof res._body);
            clientjson = JSON.parse(res._body);
            console.log(clientjson);


            this.localiteService.Localite_post(localitejson).subscribe(res2 => {
                /*console.log(typeof res._body);
                 const resjson = JSON.parse(res._body);
                 console.log(resjson);*/
                localitejson = JSON.parse(res2._body);

                this.TypeService.Type_post(typejson).subscribe(res3 => {
                    typejson = JSON.parse(res3._body);
                    /*
                     console.log(clientjson);
                     console.log(localitejson);
                     console.log(typejson);

                     */
                    vehiculejson['type_veh'] = typejson;
                    vehiculejson['localite'] = localitejson;
                    console.log(vehiculejson);
                    this.vehiculeService.Vehicule_post(vehiculejson).subscribe(res4 => {
                        vehiculejson = JSON.parse(res4._body);
                        console.log('**********************');

                        reservationsjson['client'] = clientjson;
                        reservationsjson['vehicule'] = JSON.parse(res4._body);


                        this.ReservationsService.Reservation_post(reservationsjson).subscribe(res5 => {
                            reservationsjson = JSON.parse(res5._body);



                            swal({
                                type: 'success',
                                title: 'Réservation Enregistrée',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }, err => {
                            console.error(err);
                            this.erreur(err, 'reservationsjson');
                        });


                    }, err => {
                        console.error(err);
                        this.erreur(err, 'vehiculejson');
                    });


                }, err => {
                    console.error(err);
                    this.erreur(err, 'Type erreur');
                });


            }, err => {
                console.error(err);
                this.erreur(err, 'localitejson');
            });


        }, err => {
            console.error(err);
            this.erreur(err, 'clientjson');
        });


    }

    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };

    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

    Contact() {
        console.log('contact');
    }

    erreur(err, NameOfError) {
        swal(
            '' + NameOfError,
            '' + JSON.stringify(err),
            'error'
        );
    }

    ngOnInit() {
        if (this.auth.isAdmin) {
            this.clientService.getClientTop5().subscribe(results => {

                this.Liste_clientsTop5 = results;
                // console.log(this.Liste_clientsTop5);
            }, error => {
                this.erreur(error, 'Liste des TOP 5 Clients Erreur');
            });

            this.vehiculeService.getVehiculeTop5().subscribe(results => {

                this.Liste_vehiculesTop5 = results;
                // console.log(this.Liste_vehiculesTop5);
            }, error => {
                this.erreur(error, 'Liste des TOP 5 Vehicule Erreur');
            });
        }
        this.addReservation = this.formBuilder.group({
            nom_client: this.nom_client,
            adresse_client: this.adresse_client,
            tel_client: this.tel_client,
            mail_client: this.mail_client,
            Date_arrivée: this.Date_arrivée,
            destination: this.destination,
            heure_de_arrivée: this.heure_de_arrivée,
            nbr_voyageur: this.nbr_voyageur,
            matricule_veh: this.matricule_veh,
            marque_veh: this.marque_veh,
            puissance_veh: this.puissance_veh,
            nombre_place: this.nombre_place,
            nom_type: this.nom_type,
            tarif: this.tarif,
            nom_local: this.nom_local
        });
        this.ContactForm = this.formBuilder.group({
            commentaire: this.commentaire
        });
        this.myStyle = {
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'z-index': -1,
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
        };

        this.myParams = {
            particles: {
                number: {
                    value: 100,
                },
                color: {
                    value: '#ff8000'
                },
                shape: {
                    type: 'circle',
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: false,
                    }
                },
                size: {
                    value: 5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 5
                    }
                },
                move: {
                    enable: true,
                    speed: 5
                },
            }
        };
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

        const dataDailySalesChart: any = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38]
            ]
        };

        const optionsDailySalesChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        this.startAnimationForLineChart(dailySalesChart);


        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

        const dataCompletedTasksChart: any = {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
                [230, 750, 450, 300, 280, 240, 200, 190]
            ]
        };

        const optionsCompletedTasksChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {top: 0, right: 0, bottom: 0, left: 0}
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);


        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        var dataEmailsSubscriptionChart = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

            ]
        };
        var optionsEmailsSubscriptionChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {top: 0, right: 5, bottom: 0, left: 0}
        };
        var responsiveOptions: any[] = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
        var emailsSubscriptionChart = new Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

        //start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(emailsSubscriptionChart);
    }


}

