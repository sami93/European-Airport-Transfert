import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from 'app/services/Client.service';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import * as JSPdf from 'jspdf';
import {ToastComponent} from '../shared/Toast/Toast.component';
@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;

    dtOptions: any = {};
    client: any = {};
    dtTrigger: Subject<any> = new Subject();
    addClient: FormGroup;
    nom_client = new FormControl('', Validators.required);
    adresse_client = new FormControl('', Validators.required);
    tel_client = new FormControl('', Validators.required);
    mail_client = new FormControl('', Validators.required);
    Liste_clients: any [];

    constructor(private http: Http,
                private formBuilder: FormBuilder,
                private clientService: ClientService,
                public toast: ToastComponent) {

    }

    /*  this.http.get('/api/predictions')
     .map(this.extractData3)
     .subscribe(predictions => {
     this.predict_names = [];
     console.log(predictions);
     this.predict_names = predictions; */
    /*  this.dtOptions = {
     searching: true,
     pagingType: 'full_numbers',
     scrollX: false,
     autoWidth: true,
     deferRender: true,
     info: true,
     jQueryUI: false,
     lengthChange: true,
     ordering: false,
     paging: true,
     processing: true,
     scrollY: '400px',
     stateSave: true,
     destroy: true,
     displayStart: 1,
     orderCellsTop: true,
     orderClasses: true,
     retrieve: true,
     renderer: this.dtendrer,
     scrollCollapse: false,
     searchDelay: 0,
     // dom: 'Bfrtip',
     // Configure the buttons
     buttons: [
     'copy',
     'print',
     'pdf',
     'excel'
     ]
     }; */
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
                    value: '#ff0000'
                },
                shape: {
                    type: 'triangle',
                },
                size: {
                    value: 10,
                },

            }
        };


        this.addClient = this.formBuilder.group({
            nom_client: this.nom_client,
            adresse_client: this.adresse_client,
            tel_client: this.tel_client,
            mail_client: this.mail_client,
        });
        this.clientService.getClients().subscribe(results => {
            this.dtOptions = {
                pagingType: 'full_numbers',
                // Declare the use of the extension in the dom parameter
            };
            this.Liste_clients = results;
            this.dtTrigger.next();
            console.log(this.Liste_clients);
        }, error => {
            this.erreur(error, 'Liste des Clients Erreur');
        });

    }

    editClient(client) {

        this.client = client;
        this.clientService.editClient(client).subscribe(
            res => {

                /*   this.isEditing = false;
                 this.client = client;
                 */
                this.toast.setMessage('item edited successfully.', 'success');
                window.location.reload();
            },
            error => console.log(error)
        );
    }

    deleteClient(client) {
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
                this.toast.setMessage('Client : ' + client.nom_client + ' deleted successfully.', 'success');

                console.log(client);
                this.clientService.deleteClient(client).subscribe(
                    res => {
                    /*    swal(
                            'Supprimé!',
                            'Votre Client ' + client.nom_client + ' a été supprimé.',
                            'success'
                        );
                        */
                        /*   const pos = this.Liste_clients.map(elem => elem._id).indexOf(client._id);
                         this.Liste_clients.splice(pos, 1); */
                        this.toast.setMessage(client.nom_client + ' deleted successfully.', 'success');
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


        }, (dismiss) => {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your Client ',
                    'error'
                );
            }
        });

    }


    getInfoClient(client) {
        this.clientService.client_post(client).subscribe(results => {
            console.log(results);
            swal({
                title: '  <span style="color:#6495ED;font-weight:bold"> Client : '
                + client.nom_client + '</span> ',
                showConfirmButton: true,
                html: `<center><table id="table" border=1 class="table .table-bordered">
        <thead>
            <tr>
            <th>Adresse</th>
                   <th>Nombre_Réservation</th>
           
               
            </tr>
        </thead>
        <tbody>
            <tr>
               <td>` + client.adresse_client + `</td>
                       <td>` + results._body + `</td>
              
            </tr>
          </tbody>
</table>
</center>`,

                type: 'info'
            });
        }, error => {
            this.erreur(error, 'Liste des Clients Erreur');
        });

    }


    generatePdf(client) {

        let doc = new JSPdf();
        doc.text(100, 10, 'EAT_ISI');
        doc.text(80, 20, 'Les Informations de Client : ' + client.nom_client).setFontSize(12);
        doc.setFont('arial');
        let item = {
            'Name': client.nom_client,
            'Adresse': client.adresse_client,
            'Tel': client.tel_client,
            'Mail': client.mail_client
        };

        var i = 30;

        for (let key in item) {

            doc.text(50, 10 + i, key + ': ' + item[key]);

            i += 10;

        }

        doc.save(client.nom_client + '.pdf');
    }

    erreur(err, NameOfError) {
        swal(
            '' + NameOfError,
            '' + JSON.stringify(err),
            'error'
        );
    }


    ajouterClient() {
        // console.log(this.addClient.value);
        this.clientService.client_add(this.addClient.value).subscribe(res => {
            console.log(typeof res._body);
            const resjson = JSON.parse(res._body);
            console.log(resjson);
            window.location.reload();
        }, err => {
        });
    }

}
