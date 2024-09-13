import {Component, OnInit, Inject, Injectable} from '@angular/core';
import { LoginService } from '../../../services/login.service';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Login from '../../../models/user';
import { ChipModule } from 'primeng/chip';
import { NgIf } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [ToolbarModule, SharedModule, NgIf, ChipModule]
})


export class HeaderComponent implements OnInit {

  token = '';
  users = [];
  user = [];

  logger = [];

  newLogin: any = {};


  estDesactive = false;
  estVisibleMagasins = false;
  estVisibleUnites = false;

  estVisibleProgrammes = false;

  MyselectedId = [];
  NewLigne = [];

  showMenu = false;
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }


  constructor(
    public router: Router,
    public loginService: LoginService,
    )
    {

    }

  ngOnInit() {
  }

  openDialog() {

    this.opensweetalertmsg();

  }

  disconnect() {


  // this.close();

    this.router.navigate(['']);
  }


  opensweetalertdng()
  {
   Swal.fire('Oops...', 'Something went wrong!', 'error')
  }

    opensweetalertcst(){
    Swal.fire({
      icon: 'info',
      title: 'Gestion Assurance',
      text: 'Version 1.0.0',
      footer: '© Copyright 2019 by <a href= https://www.cncas.sn/accueil target=_blank>La Banque Agricole</a>',
      showCancelButton: true,
      confirmButtonText: 'Ouvrir!',
      cancelButtonText: 'Fermer'
    }).then((result: any) => {
      if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
      }
    })
  }
  opensweetalertmsg(){
    let timerInterval
    Swal.fire({
        // icon: 'question',
        //imageUrl: '<img src="../../../assets/images/agricash_logo.jpeg">',
        title: 'Suivi Ops ' ,
        text: 'Version 1.0.0',
        backdrop: "linear-gradient(yellow, orange)",
        background: "white",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        footer: '©2021 &nbsp; <a href= https://www.cncas.sn/accueil target=_blank> La Banque Agricole</a>',
        html: 'Version 1.0.0 <br><br>' +
        // 'Ferme dans <b></b> milliseconds.' +
        '<img src="/assets/images/agricash_logo.jpeg" alt="CONNEXUS" ><br><br>' +

        '<table style="width:100%"><tr><td bgcolor="#F8F9F9" width="10%" align="center"><i class="fas fa-user"></i></td><td width="80%"><mat-form-field>' +
        '<input matInput id="swal-input1"  class="swal2-input" required minlength="4" placeholder="Compte Utilisateur" [(ngModel)]="newLogin.username"></mat-form-field></td></tr>'+


        '<tr *ngIf="!this.estDesactive"><td bgcolor="#F8F9F9" width="10%" align="center"><i class="fas fa-key"></i></td><td width="80%"> <mat-form-field>' +
        '<input matInput id="swal-input2"  class="swal2-input" type="password" required minlength="4" placeholder="Mot de passe" ></mat-form-field></td></tr></table>',

          //'<input type=email id="swal-input1" class="swal2-input">' +
          //'<input type=password id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            //document.getElementById('swal-input1')['value'],
            //document.getElementById('swal-input2')['value']
          ]
        },
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },

        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Ouvrir',
        cancelButtonText: 'Fermer',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',


      timer: 40000,
      timerProgressBar: true
    }).then((result: any) => {
      if (result.value) {

        this.newLogin['username']= result.value[0];
        this.newLogin['password']= result.value[1];
        this.save(this.newLogin);
        console.log('mes valeurs: ', result.value);


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          {
            icon: 'error',
            title: 'Oops...',
            text: 'Vous avez décidé d\'annuler!',
            footer: '<a href>Why do I have this issue?</a>',
            timer: 2000,
            showCancelButton: false,
            showCloseButton: false,
            showConfirmButton: false,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },

          }

        )
      }
    })
    }


    save(login: Login) {

      const body = {
        "username": login['username'],
        "password": login['password']

      };
      this.loginService.UserConnexion.user.username =  body.username;
      this.loginService.UserConnexion.user.password = body.password;



      this.loginService.showNav();
      console.log( 'this.loginService.UserConnexion -------- ', this.loginService.UserConnexion);

    }

/*
    selectNavProfile(profil: string) {

      if(profil === 'admin'){
        this.loginService.items = [
          {
              label:'File',
              icon:'pi pi-fw pi-file',
              items:[
                  {
                      label:'New',
                      icon:'pi pi-fw pi-plus',
                      items:[
                      {
                          label:'Bookmark',
                          icon:'pi pi-fw pi-bookmark'
                      },
                      {
                          label:'Video',
                          icon:'pi pi-fw pi-video'
                      },

                      ]
                  },
                  {
                      label:'Delete',
                      icon:'pi pi-fw pi-trash'
                  },
                  {
                      separator:true
                  },
                  {
                      label:'Export',
                      icon:'pi pi-fw pi-external-link'
                  }
              ]
          },
          {
              label:'Edit',
              icon:'pi pi-fw pi-pencil',
              items:[
                  {
                      label:'Left',
                      icon:'pi pi-fw pi-align-left'
                  },
                  {
                      label:'Right',
                      icon:'pi pi-fw pi-align-right'
                  },
                  {
                      label:'Center',
                      icon:'pi pi-fw pi-align-center'
                  },
                  {
                      label:'Justify',
                      icon:'pi pi-fw pi-align-justify'
                  },

              ]
          },
          {
              label:'Admins',
              icon:'pi pi-fw pi-user',
              items:[
                  {
                      label:'New',
                      icon:'pi pi-fw pi-user-plus',

                  },
                  {
                      label:'Delete',
                      icon:'pi pi-fw pi-user-minus',

                  },
                  {
                      label:'Search',
                      icon:'pi pi-fw pi-users',
                      items:[
                      {
                          label:'Filter',
                          icon:'pi pi-fw pi-filter',
                          items:[
                              {
                                  label:'Print',
                                  icon:'pi pi-fw pi-print'
                              }
                          ]
                      },
                      {
                          icon:'pi pi-fw pi-bars',
                          label:'List'
                      }
                      ]
                  }
              ]
          },
          {
              label:'Events',
              icon:'pi pi-fw pi-calendar',
              items:[
                  {
                      label:'Edit',
                      icon:'pi pi-fw pi-pencil',
                      items:[
                      {
                          label:'Save',
                          icon:'pi pi-fw pi-calendar-plus'
                      },
                      {
                          label:'Delete',
                          icon:'pi pi-fw pi-calendar-minus'
                      },

                      ]
                  },
                  {
                      label:'Archieve',
                      icon:'pi pi-fw pi-calendar-times',
                      items:[
                      {
                          label:'Remove',
                          icon:'pi pi-fw pi-calendar-minus'
                      }
                      ]
                  }
              ]
          },
          {
              label:'Quit',
              icon:'pi pi-fw pi-power-off'
          }
      ];
      }
      if(profil === 'admin'){
        this.loginService.items = [
          {
              label:'File',
              icon:'pi pi-fw pi-file',
              items:[
                  {
                      label:'New',
                      icon:'pi pi-fw pi-plus',
                      items:[
                      {
                          label:'Bookmark',
                          icon:'pi pi-fw pi-bookmark'
                      },
                      {
                          label:'Video',
                          icon:'pi pi-fw pi-video'
                      },

                      ]
                  },
                  {
                      label:'Delete',
                      icon:'pi pi-fw pi-trash'
                  },
                  {
                      separator:true
                  },
                  {
                      label:'Export',
                      icon:'pi pi-fw pi-external-link'
                  }
              ]
          },
          {
              label:'Edit',
              icon:'pi pi-fw pi-pencil',
              items:[
                  {
                      label:'Left',
                      icon:'pi pi-fw pi-align-left'
                  },
                  {
                      label:'Right',
                      icon:'pi pi-fw pi-align-right'
                  },
                  {
                      label:'Center',
                      icon:'pi pi-fw pi-align-center'
                  },
                  {
                      label:'Justify',
                      icon:'pi pi-fw pi-align-justify'
                  },

              ]
          },
          {
              label:'Zones',
              icon:'pi pi-fw pi-user',
              items:[
                  {
                      label:'New',
                      icon:'pi pi-fw pi-user-plus',

                  },
                  {
                      label:'Delete',
                      icon:'pi pi-fw pi-user-minus',

                  },
                  {
                      label:'Search',
                      icon:'pi pi-fw pi-users',
                      items:[
                      {
                          label:'Filter',
                          icon:'pi pi-fw pi-filter',
                          items:[
                              {
                                  label:'Print',
                                  icon:'pi pi-fw pi-print'
                              }
                          ]
                      },
                      {
                          icon:'pi pi-fw pi-bars',
                          label:'List'
                      }
                      ]
                  }
              ]
          },
          {
              label:'Events',
              icon:'pi pi-fw pi-calendar',
              items:[
                  {
                      label:'Edit',
                      icon:'pi pi-fw pi-pencil',
                      items:[
                      {
                          label:'Save',
                          icon:'pi pi-fw pi-calendar-plus'
                      },
                      {
                          label:'Delete',
                          icon:'pi pi-fw pi-calendar-minus'
                      },

                      ]
                  },
                  {
                      label:'Archieve',
                      icon:'pi pi-fw pi-calendar-times',
                      items:[
                      {
                          label:'Remove',
                          icon:'pi pi-fw pi-calendar-minus'
                      }
                      ]
                  }
              ]
          },
          {
              label:'Quit',
              icon:'pi pi-fw pi-power-off'
          }
      ];
      }
      if(profil === 'consultant'){
        this.loginService.items = [
          {
              label:'Edit',
              icon:'pi pi-fw pi-pencil',
              items:[
                  {
                      label:'Left',
                      icon:'pi pi-fw pi-align-left'
                  },
                  {
                      label:'Right',
                      icon:'pi pi-fw pi-align-right'
                  },
                  {
                      label:'Center',
                      icon:'pi pi-fw pi-align-center'
                  },
                  {
                      label:'Justify',
                      icon:'pi pi-fw pi-align-justify'
                  },

              ]
          },
          {
              label:'Consultants',
              icon:'pi pi-fw pi-user',
              items:[
                  {
                      label:'New',
                      icon:'pi pi-fw pi-user-plus',

                  },
                  {
                      label:'Delete',
                      icon:'pi pi-fw pi-user-minus',

                  },
                  {
                      label:'Search',
                      icon:'pi pi-fw pi-users',
                      items:[
                      {
                          label:'Filter',
                          icon:'pi pi-fw pi-filter',
                          items:[
                              {
                                  label:'Print',
                                  icon:'pi pi-fw pi-print'
                              }
                          ]
                      },
                      {
                          icon:'pi pi-fw pi-bars',
                          label:'List'
                      }
                      ]
                  }
              ]
          },
          {
              label:'Events',
              icon:'pi pi-fw pi-calendar',
              items:[
                  {
                      label:'Edit',
                      icon:'pi pi-fw pi-pencil',
                      items:[
                      {
                          label:'Save',
                          icon:'pi pi-fw pi-calendar-plus'
                      },
                      {
                          label:'Delete',
                          icon:'pi pi-fw pi-calendar-minus'
                      },

                      ]
                  },
                  {
                      label:'Archieve',
                      icon:'pi pi-fw pi-calendar-times',
                      items:[
                      {
                          label:'Remove',
                          icon:'pi pi-fw pi-calendar-minus'
                      }
                      ]
                  }
              ]
          },
          {
              label:'Quit',
              icon:'pi pi-fw pi-power-off'
          }
      ];
      }

    }
*/

    close() {

      this.loginService.hideNav();
      this.loginService.UserConnexion.user.role.id = 0;
      this.loginService.UserConnexion.user.email = '';
      this.loginService.UserConnexion.user.profile.firstName = '';
      this.loginService.UserConnexion.user.profile.lastName = '';
      this.loginService.UserConnexion.user.username = '';
      this.loginService.UserConnexion.user.role.name = '';
      this.router.navigate(['']);
      }

      openHome(){
        this.router.navigate(['/']);
      }


async openslistprogrammes(programmes_connexion: any){
    const {value: entrepotss} = await Swal.fire({
      icon: 'success',
      title: 'Liste des programmes',
      backdrop: "linear-gradient(yellow, orange)",
      background: "white",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      input: 'select',
      inputOptions: programmes_connexion,

/*
      html: '<mat-form-field><mat-label>Lieux de stockage</mat-label><mat-select (selectionChange)="trouveLoggin()" [(ngModel)]="Id_emplacement_connexion">' +
          '<mat-option *ngFor="let emplacement of emplacements_connexion" [value]="emplacement.idEmplacement">{{emplacement.Emplacement}}</mat-option></mat-select></mat-form-field>',
*/

      timer: 30000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      inputPlaceholder: 'Choisir un programme',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      cancelButtonText: 'Fermer',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputValidator: (value: string) => {
        return new Promise((resolve) => {
          if (value !== '') {
            // resolve()
          } else {
            resolve('Choisir un programme :)')
          }
        })
      }
    })



  }


}
