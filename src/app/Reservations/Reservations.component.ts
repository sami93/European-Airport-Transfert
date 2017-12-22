import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import * as JSPdf from 'jspdf';
import {ToastComponent} from '../shared/Toast/Toast.component';
import {ReservationsService} from '../services/Reservations.service';
import {AuthService} from '../services/auth.service';
@Component({
    selector: 'app-reservations',
    templateUrl: './Reservations.component.html',
    styleUrls: ['./Reservations.component.css']
})
export class ReservationsComponent implements OnInit {
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;
    Liste_Reservations: any[];
    dtOptions: any;
    dtTrigger: Subject<any> = new Subject();
    Reservation: any = {};
    addReservation: FormGroup;
    Date_arrivée = new FormControl('', Validators.required);
    Destination = new FormControl('', Validators.required);
    Heure_arrivée = new FormControl('', Validators.required);
    Nbr_voyageur = new FormControl('', Validators.required);
    Etat = new FormControl('', Validators.required);

    constructor(private http: Http,
                private formBuilder: FormBuilder,
                private ReservationService: ReservationsService,
                public toast: ToastComponent,
                private auth: AuthService) {

    }


    ngOnInit(): void {
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
                    value: '#40ff00'
                },
                shape: {
                    type: 'edge',
                },
                size: {
                    value: 5,
                },
                move: {
                    enable: true,
                    speed: 5
                },
            }
        };
        this.addReservation = this.formBuilder.group({
            Date_arrivée: this.Date_arrivée,
            Destination: this.Destination,
            Heure_arrivée: this.Heure_arrivée,
            Nbr_voyageur: this.Nbr_voyageur,
            Etat: this.Etat
        });
        this.ReservationService.getReservations().subscribe(results => {
            this.dtOptions = {
                pagingType: 'full_numbers',
                class: 'none',
                responsive: true
                // Declare the use of the extension in the dom parameter
            };
            this.Liste_Reservations = results;
            this.dtTrigger.next();
            console.log(this.Liste_Reservations);
        }, error => {
            this.erreur(error, 'Liste des Réservations Erreur');
        });
    }

    editReservation(Reservation) {

        this.Reservation = Reservation;
        this.ReservationService.editReservation(Reservation).subscribe(
            res => {

                /*   this.isEditing = false;
                 this.Reservation = Reservation;
                 */
                this.toast.setMessage('item edited successfully.', 'success');
                window.location.reload();
            },
            error => console.log(error)
        );
    }

    deleteReservation(Reservation) {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            console.log('s');
            if (result.value) {
                console.log(Reservation);
                this.ReservationService.deleteReservation(Reservation).subscribe(
                    res => {
                        /*    swal(
                                'Supprimé!',
                                'Votre Reservation ' + Reservation.nom_client + ' a été supprimé.',
                                'success'
                            );
                            */
                        /*   const pos = this.Liste_clients.map(elem => elem._id).indexOf(Reservation._id);
                         this.Liste_clients.splice(pos, 1); */
                        this.toast.setMessage(Reservation.destination + ' deleted successfully.', 'success');
                        window.location.reload();
                    },
                    error => console.log(error)
                );
            }
            if (!result.value) {
                swal(
                    'Cancelled',
                    'Annulé',
                    'error'
                );
            }
            /*  this.ReservationService.deleteReservation(Reservation).subscribe(
             res => {

             const pos = this.Liste_Reservations.map(elem => elem._id).indexOf(Reservation._id);
             this.Liste_Reservations.splice(pos, 1);
             this.toast.setMessage(Reservation.Name + ' deleted successfully.', 'success');
             window.location.reload();
             },
             error => console.log(error)
             );
             */
        }, (dismiss) => {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your Reservation ',
                    'error'
                );
            }
        });

    }


    getInfoReservation(Reservation) {
        swal({
            title: '  <span style="color:#6495ED;font-weight:bold"> Reservation : '
            + Reservation.destination + '</span> ',
            showConfirmButton: true,
            html: `<center><table id="table" border=1 class="table .table-bordered">
      
       <tbody>
       
       
         <tr>
            <td>destination</td>
            <td>` + Reservation.destination + `</td>
         </tr>
         
            <tr>
            <td>etat_res</td>
            <td>` + Reservation.etat_res + `</td>
         </tr>
                
                    <tr>
            <td>nbr_voyageur</td>
               <td>` + Reservation.nbr_voyageur + `</td>
         </tr>
                <tr>
                <td>matricule_veh</td>
   <td>` + Reservation.vehicule.matricule_veh + `</td>
         </tr>
          <tr>
                
            <td>marque_veh</td>
   <td>` + Reservation.vehicule.marque_veh + `</td>
         </tr>
          <tr>
            <td>puissance_veh</td>
   <td>` + Reservation.vehicule.puissance_veh + `</td>
         </tr>
         
                <tr>
            <td>nombre_place</td>
   <td>` + Reservation.vehicule.nombre_place + `</td>
         </tr>
 
                       <tr>
            <td>nom_type</td>
   <td>` + Reservation.vehicule.type_veh.nom_type  + `</td>
         </tr>
                  </tr>
 
                       <tr>
            <td>tarif</td>
   <td>` + Reservation.vehicule.type_veh.tarif  + `</td>
         </tr>
       
                          <tr>
            <td>Localité</td>
   <td>` + Reservation.vehicule.localite.nom_local  + `</td>
         </tr>
             
             
             
                         <td>nom_client</td>
   <td>` + Reservation.client.nom_client  + `</td>
         </tr>
                  </tr>
 
                       <tr>
            <td>adresse_client</td>
   <td>` + Reservation.client.adresse_client  + `</td>
         </tr>
       
                          <tr>
            <td>tel_client</td>
   <td>` + Reservation.client.tel_client  + `</td>
         </tr>
             
                
                          <tr>
            <td>mail_client</td>
   <td>` + Reservation.client.mail_client  + `</td>
         </tr>
             
          </tbody>
</table>
</center>`,

            type: 'info'
        });
    }


    generatePdf(Reservation) {

        let doc = new JSPdf();
        doc.text(100, 10, 'EAT_ISI');
        doc.text(80, 20, 'Les Informations de Reservation : ' + Reservation.destination).setFontSize(12);
        doc.setFont('arial');
        let item = {
            'Destination': Reservation.destination,
            'nbr_voyageur': Reservation.nbr_voyageur
        };

        var i = 30;

        for (let key in item) {

            doc.text(50, 10 + i, key + ': ' + item[key]);

            i += 10;

        }

        doc.save(Reservation.destination + '.pdf');
    }


    erreur(err, NameOfError) {
        swal(
            '' + NameOfError,
            '' + JSON.stringify(err),
            'error'
        );
    }


}
