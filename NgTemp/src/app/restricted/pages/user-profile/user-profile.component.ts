import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestrictedService } from '../../services/restricted.service';
import {
  UserData,
  Usuario,
  UsuarioPassword,
  UsuarioProfile,
} from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  //!Variable para controlar el tab activo por defecto es account
  public activeTab = 'account';

  //!Variable para almacenar la información del usuario que se obtiene de la base de datos
  public usuario?: Usuario;

  //!Arreglo de objetos que contiene la información de los tabs del sidenav del usuario
  public sidenavMenu = [
    {
      label: 'Información de la cuenta',
      icon: 'settings_account_box',
      //!Función que se ejecuta al dar click en el tab del sidenav en este caso llama a la función onTabChange y le pasa como parametro 'account'
      action: () => this.onTabChange('account'),
    },
    {
      label: 'Cambiar contraseña',
      icon: 'password',
      action: () => this.onTabChange('password'),
    },
  ];

  //!Arreglo de objetos que contiene la información de los tabs del sidenav del admin
  //!Esta separado del otro para poder ocultarlo si es necesario
  public adminSidenavMenu = [
    {
      label: 'Administrar usuarios',
      icon: 'admin_panel_settings',
      action: () => this.onTabChange('admin'),
    },
  ];

  //!Formulario reactivo para el perfil del usuario
  public userProfileForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required], []],
    email: ['', [Validators.required], []],
    //rol: ['', [Validators.required], []],
    //google: [false, [Validators.required], []],
  }); //this.FormBuilder

  //!Formulario reactivo para el password del usuario
  public userPasswordForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required], []],
    confirmPassword: ['', [Validators.required], []],
  });

  //!Función que se ejecuta al dar click en el botón de submit del formulario de password
  onSubmitPassword() {
    //console.log(this.userPasswordForm.value);
    //!Crea un objeto de tipo UsuarioPassword, el cual usamos para el cambio de contraseña del usuario
    const userPasswordData: UsuarioPassword = {
      //!Toma el valor del id del usuario que se obtiene de la base de datos
      id: this.usuario?.id,
      //!Toma el valor del campo password del formulario de password
      password: this.userPasswordForm.get('password')?.value,
    };

    //!Se llama al método updateUser del servicio, el cual recibe un objeto de tipo UsuarioPassword el cual contiene el campo id y password
    this.restrictedService.updateUser(userPasswordData).subscribe(
      (respuesta) => {
        //!Se muestra un snackbar con el mensaje que vienen de la API en el campo msg
        this.snackbar.open(respuesta.respuesta.msg, 'Cerrar', {
          duration: 3000,
        });
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login');
        this.getUserData();
      },
      (error: UserData) => {
        this.snackbar.open(error.error.msg, 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  onSubmitUserProfile() {
    //console.log(this.userProfileForm.value);

    const userProfileData: UsuarioProfile = {
      id: this.usuario?.id,
      nombre: this.userProfileForm.get('nombre')?.value,
      email: this.userProfileForm.get('email')?.value,
    };

    this.restrictedService.updateUser(userProfileData).subscribe(
      (respuesta) => {
        this.snackbar.open(respuesta.respuesta.msg, 'Cerrar', {
          duration: 3000,
        });
        this.getUserData();
      },
      (error: UserData) => {
        this.snackbar.open(error.error.msg, 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  onTabChange(change: string): void {
    this.activeTab = change;
  }

  getUserData(): void {
    this.restrictedService.getUserData().subscribe(
      (respuesta) => {
        //!Asignamos el valor de la respuesta a la variable local usuario
        this.usuario = respuesta.respuesta.usuario[0];
        //!Asignamos el valor de los formControl con el valor que obtuvimos de la respuesta -info del usuario
        this.userProfileForm.get('nombre')?.setValue(this.usuario.nombre);
        this.userProfileForm.get('email')?.setValue(this.usuario.email);
        /* //!Asignamos el valor de los formControl con lo que recibimos de la respuesta - password
      this.userPasswordForm.get('password')?.setValue(this.usuario.password); */
        //console.log(respuesta.respuesta.usuario);
      },
      (error: UserData) => {
        //console.log(error)
      }
    );
  }

  constructor(
    private formBuilder: FormBuilder,
    private restrictedService: RestrictedService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUserData();
  }
}
