import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import * as JSPdf from 'jspdf';
import {ToastComponent} from '../shared/Toast/Toast.component';
import {UtilisateurService} from '../services/Utilisateur.service';

@Component({
    selector: 'app-utilisateur',
    templateUrl: './Utilisateur.component.html',
    styleUrls: ['./Utilisateur.component.css']
})

export class UtilisateurComponent implements OnInit {
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    Liste_Utilisateurs: any [];
    // dtOptions: DataTables.Settings = {};

    Utilisateur: any = {};
    addUtilisateur: FormGroup;
    nom_admin = new FormControl('', Validators.required);
    adresse_admin = new FormControl('', Validators.required);
    type_admin = new FormControl('', Validators.required);
    mail_admin = new FormControl('', Validators.required);
    password_admin = new FormControl('', Validators.required);;
    constructor(private http: Http,
                private formBuilder: FormBuilder,
                private utilisateurService: UtilisateurService,
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
                    value: '#0080ff'
                },
                shape: {
                    type: 'star',
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

        this.addUtilisateur = this.formBuilder.group({
            nom_admin: this.nom_admin,
            adresse_admin: this.adresse_admin,
            mail_admin: this.mail_admin,
            type_admin: this.type_admin,
            password_admin: this.password_admin,
        });
        this.utilisateurService.getUtilisateurs().subscribe(results => {
            this.dtOptions = {
                pagingType: 'full_numbers',
                // Declare the use of the extension in the dom parameter
            };
            this.Liste_Utilisateurs = results;
            this.dtTrigger.next();
            console.log(this.Liste_Utilisateurs);
        }, error => {
            this.erreur(error, 'Liste des Utilisateurs Erreur');
        });
    }

    editUtilisateur(Utilisateur) {

        this.Utilisateur = Utilisateur;
        this.utilisateurService.editUtilisateur(Utilisateur).subscribe(
            res => {

                /*   this.isEditing = false;
                 this.Utilisateur = Utilisateur;
                 */
                this.toast.setMessage('item edited successfully.', 'success');
                window.location.reload();
            },
            error => console.log(error)
        );
    }

    deleteUtilisateur(Utilisateur) {
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
                this.toast.setMessage('Utilisateur : ' + Utilisateur.nom_admin + ' deleted successfully.', 'success');
                this.utilisateurService.deleteUtilisateur(Utilisateur).subscribe(
                    res => {
                        /*    swal(
                         'Supprimé!',
                         'Votre Client ' + client.nom_client + ' a été supprimé.',
                         'success'
                         );
                         */
                        /*   const pos = this.Liste_clients.map(elem => elem._id).indexOf(client._id);
                         this.Liste_clients.splice(pos, 1); */
                        this.toast.setMessage(Utilisateur.nom_admin + ' deleted successfully.', 'success');
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
            /*  this.UtilisateurService.deleteUtilisateur(Utilisateur).subscribe(
             res => {

             const pos = this.Liste_Utilisateurs.map(elem => elem._id).indexOf(Utilisateur._id);
             this.Liste_Utilisateurs.splice(pos, 1);
             this.toast.setMessage(Utilisateur.Name + ' deleted successfully.', 'success');
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
                    'Your Utilisateur ',
                    'error'
                );
            }
        });

    }


    getInfoUtilisateur(Utilisateur) {
        swal({
            title: '  <span style="color:#6495ED;font-weight:bold"> Utilisateur : '
            + Utilisateur.nom_admin + '</span> ',
            showConfirmButton: true,
            html: `<center><table id="table" border=1 class="table .table-bordered">
        <thead>
            <tr>
            <th>Adresse</th>
                <th>Mail</th>
                <th>Type</th>
           
               
            </tr>
        </thead>
        <tbody>
            <tr>
               <td>` + Utilisateur.adresse_admin + `</td>
               <td>` + Utilisateur.mail_admin + `</td>
               <td>` + Utilisateur.type_admin + `</td>
              
              
            </tr>
          </tbody>
</table>
</center>`,

            type: 'info'
        });
    }


    generatePdf(Utilisateur) {

        let doc = new JSPdf();
        doc.text(100, 10, 'EAT_ISI');
        doc.text(80, 20, 'Les Informations de Utilisateur : ' + Utilisateur.nom_admin).setFontSize(12);
        doc.setFont('arial');
        let item = {
            'Nom': Utilisateur.nom_admin,
            'Adresse': Utilisateur.adresse_admin,
            'Type': Utilisateur.type_admin,
            'Mail': Utilisateur.mail_admin
        };

        var i = 30;

        for (let key in item) {

            doc.text(50, 10 + i, key + ': ' + item[key]);

            i += 10;

        }

        doc.save(Utilisateur.nom_admin + '.pdf');
    }


    erreur(err, NameOfError) {
        swal(
            '' + NameOfError,
            '' + JSON.stringify(err),
            'error'
        );
    }

    ajouterUtilisateur() {
        // console.log(this.addClient.value);
        console.log(this.addUtilisateur.value);
        const jsonv = {};
        const jsonv2 = this.addUtilisateur.value;
        jsonv['login'] = this.addUtilisateur.value.mail_admin;
        jsonv['mot_de_passe_compte'] = this.addUtilisateur.value.password_admin;
        jsonv2['auth'] = jsonv;
        console.log(jsonv2);
        console.log(jsonv);


         this.utilisateurService.Utilisateur_post(jsonv2).subscribe(res => {
         /*console.log(typeof res._body);
         const resjson = JSON.parse(res._body);
         console.log(resjson);*/
         window.location.reload();
         }, err => {
         console.error(err);
         this.erreur(err, 'Utilisateur erreur');
         });
    }
}
