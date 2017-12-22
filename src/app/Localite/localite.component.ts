import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import * as JSPdf from 'jspdf';
import {ToastComponent} from '../shared/Toast/Toast.component';
import {LocaliteService} from '../services/Localite.service';

@Component({
    selector: 'app-localité',
    templateUrl: './localite.component.html',
    styleUrls: ['./localite.component.css']
})
export class LocaliteComponent implements OnInit {
    myStyle: object = {};
    myParams: object = {};
    liste_localites:  any [];
    width: number = 100;
    height: number = 100;
    dtTrigger: Subject<any> = new Subject();
    dtOptions: any = {};
    Localite: any = {};
    addlocalite: FormGroup;
    nom_local = new FormControl('', Validators.required);

    constructor(private http: Http,
                private formBuilder: FormBuilder,
                private localiteService: LocaliteService,
                public toast: ToastComponent) {

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
                    value: '#00bfff'
                },
                shape: {
                    Localite: 'polygon',
                },
            }
        };


        this.addlocalite = this.formBuilder.group({
            nom_local: this.nom_local,
        });
        this.dtOptions = {
            pagingLocalite: 'full_numbers'
        };

        this.localiteService.getLocalites().subscribe(results => {
            this.dtOptions = {
                pagingLocalite: 'full_numbers',
                // Declare the use of the extension in the dom parameter
            };
            this.liste_localites = results;
            console.log(this.liste_localites);
            this.dtTrigger.next();
        }, error => {
            this.erreur(error, 'Liste des Localités Erreur');
        });


    }

    editLocalite(Localite) {

        this.Localite = Localite;
        this.localiteService.editLocalite(Localite).subscribe(
            res => {

                /*   this.isEditing = false;
                 this.Localite = Localite;
                 */
                this.toast.setMessage('item edited successfully.', 'success');
                window.location.reload();
            },
            error => console.log(error)
        );
    }

    deleteLocalite(Localite) {
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
                this.toast.setMessage('Type : ' + Localite.nom_local + ' deleted successfully.', 'success');

                console.log(Localite);
                this.localiteService.deleteLocalite(Localite).subscribe(
                    res => {
                        /*    swal(
                         'Supprimé!',
                         'Votre Client ' + client.nom_client + ' a été supprimé.',
                         'success'
                         );
                         */
                        /*   const pos = this.Liste_clients.map(elem => elem._id).indexOf(client._id);
                         this.Liste_clients.splice(pos, 1); */
                        this.toast.setMessage(Localite.nom_local + ' deleted successfully.', 'success');
                        window.location.reload();
                    },
                    error => console.error(error)
                );

            }
            if (!result.value) {
                swal(
                    'Cancelled',
                    'Annulé',
                    'error'
                );
            }
            /*  this.LocaliteService.deleteLocalite(Localite).subscribe(
             res => {

             const pos = this.Liste_Localites.map(elem => elem._id).indexOf(Localite._id);
             this.Liste_Localites.splice(pos, 1);
             this.toast.setMessage(Localite.Name + ' deleted successfully.', 'success');
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
                    'Your Localite ',
                    'error'
                );
            }
        });

    }

    generatePdf(Localite) {

        let doc = new JSPdf();
        doc.text(100, 10, 'EAT_ISI');
        doc.text(80, 20, 'Les Informations de Localite : ' + Localite.nom_local).setFontSize(12);
        doc.setFont('arial');
        let item = {
            'Nom': Localite.nom_local,
        };

        var i = 30;

        for (let key in item) {

            doc.text(50, 10 + i, key + ': ' + item[key]);

            i += 10;

        }

        doc.save(Localite.nom_local + '.pdf');
    }


    erreur(err, NameOfError) {
        swal(
            '' + NameOfError,
            '' + JSON.stringify(err),
            'error'
        );
    }
    ajouterLocalite() {
        // console.log(this.addClient.value);
        this.localiteService.Localite_post(this.addlocalite.value).subscribe(res => {
            /*console.log(typeof res._body);
             const resjson = JSON.parse(res._body);
             console.log(resjson);*/
            window.location.reload();
        }, err => {
            console.error(err);
            this.erreur(err, 'Type erreur');
        });
    }

}
