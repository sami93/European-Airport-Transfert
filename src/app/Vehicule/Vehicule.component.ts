import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import swal from 'sweetalert2';
import * as JSPdf from 'jspdf';
import {ToastComponent} from '../shared/Toast/Toast.component';
import {VehiculeService} from 'app/services/Vehicule.service';

@Component({
    selector: 'app-vehicule',
    templateUrl: './Vehicule.component.html',
    styleUrls: ['./Vehicule.component.css']
})

export class VehiculeComponent implements OnInit {
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    Liste_Vehicules: any [];
    // dtOptions: DataTables.Settings = {};
    Vehicule: any = {};
    addVehicule: FormGroup;
    matricule_veh = new FormControl('', Validators.required);
    marque_veh = new FormControl('', Validators.required);
    puissance_veh = new FormControl('', Validators.required);
    nombre_place = new FormControl('', Validators.required);

    constructor(private http: Http,
                private formBuilder: FormBuilder,
                private vehiculeService: VehiculeService,
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
                    value: '#ff8000'
                },
                shape: {
                    type: 'circle',
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

        this.addVehicule = this.formBuilder.group({
            matricule_veh: this.matricule_veh,
            marque_veh: this.marque_veh,
            puissance_veh: this.puissance_veh,
            nombre_place: this.nombre_place,
        });
        this.vehiculeService.getVehicules().subscribe(results => {
            this.dtOptions = {
                pagingType: 'full_numbers',
                // Declare the use of the extension in the dom parameter
            };
            this.Liste_Vehicules = results;
            this.dtTrigger.next();
            console.log(this.Liste_Vehicules);
        }, error => {
            this.erreur(error, 'Liste desVehicules Erreur');
        });
    }

    editVehicule(Vehicule) {

        this.Vehicule = Vehicule;
        this.vehiculeService.editVehicule(Vehicule).subscribe(
            res => {

                /*   this.isEditing = false;
                 this.Vehicule = Vehicule;
                 */
                this.toast.setMessage('item edited successfully.', 'success');
                window.location.reload();
            },
            error => console.log(error)
        );
    }

    deleteVehicule(Vehicule) {
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
                this.toast.setMessage('Vehicule : ' + Vehicule.matricule_veh + ' deleted successfully.', 'success');
                swal(
                    'Supprimé!',
                    'Votre Vehicule ' + Vehicule.matricule_veh + ' a été supprimé.',
                    'success'
                );
            }
            if (!result.value) {
                swal(
                    'Cancelled',
                    'Annulé',
                    'error'
                );
            }
            /*  this.VehiculeService.deleteVehicule(Vehicule).subscribe(
             res => {

             const pos = this.Liste_Vehicules.map(elem => elem._id).indexOf(Vehicule._id);
             this.Liste_Vehicules.splice(pos, 1);
             this.toast.setMessage(Vehicule.Name + ' deleted successfully.', 'success');
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
                    'Your Vehicule ',
                    'error'
                );
            }
        });

    }


    getInfoVehicule(Vehicule) {
        swal({
            title: '  <span style="color:#6495ED;font-weight:bold"> Vehicule : '
            + Vehicule.matricule_veh + '</span> ',
            showConfirmButton: true,
            html: `<center><table id="table" border=1 class="table .table-bordered">

               
       
            </tr>
     
        <tbody>
         <tr>
            <td>Matricule</td>
            <td>` + Vehicule.matricule_veh + `</td>
         </tr>
                
                    <tr>
            <td>Marque</td>
               <td>` + Vehicule.marque_veh + `</td>
         </tr>
                <tr>
            <td>Puissance</td>
   <td>` + Vehicule.puissance_veh + `</td>
         </tr>
          <tr>
            <td>Nbre_Place</td>
   <td>` + Vehicule.nombre_place + `</td>
         </tr>
         
                <tr>
            <td>Type</td>
   <td>` + Vehicule.type_veh.nom_type + `</td>
         </tr>
 
                       <tr>
            <td>Tarif</td>
   <td>` + Vehicule.type_veh.tarif  + `</td>
         </tr>
       
                          <tr>
            <td>Localité</td>
   <td>` + Vehicule.localite.nom_local  + `</td>
         </tr>
             
          </tbody>
</table>
</center>`,

            type: 'info'
        });
    }


    generatePdf(Vehicule) {

        let doc = new JSPdf();
        doc.text(100, 10, 'EAT_ISI');
        doc.text(80, 20, 'Les Informations de Vehicule : ' + Vehicule.matricule_veh).setFontSize(12);
        doc.setFont('arial');
        let item = {
            'Name': Vehicule.matricule_veh,
            'Adresse': Vehicule.marque_veh,
            'Tel': Vehicule.puissance_veh,
            'Mail': Vehicule.nombre_place
        };

        var i = 30;

        for (let key in item) {

            doc.text(50, 10 + i, key + ': ' + item[key]);

            i += 10;

        }

        doc.save(Vehicule.matricule_veh + '.pdf');
    }


    erreur(err, NameOfError) {
        swal(
            '' + NameOfError,
            '' + JSON.stringify(err),
            'error'
        );
    }

}
