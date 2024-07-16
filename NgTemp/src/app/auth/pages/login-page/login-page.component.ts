import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuarios } from '../../interfaces/usuarios.interface';
import {
  LoginError,
  Login,
  LoginFields,
} from '../../interfaces/login.interface';
import { ValidatorsService } from 'src/app/shared/services/validators/validators.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  //!Para usar los formularios reactivos, se debe importar el módulo ReactiveFormsModule en el módulo que se esté utilizando
  //!Utiliza el formBuilder para crear un formulario reactivo con los campos email, password y rememberMe
  public loginForm = this.formBuilder.group({
    //!El formGroup puede ser un arreglo de formArray o formControl
    //!Utiliza tres parametros que es el valor inicial, las validaciones sincronas y las validaciones asincronas
    //!Para las validaciones pueden usarse las que ya vienen predise;adas en Angular, o pueden hacerse validaciones personalizadas
    //!Por ejeplo required es cuando el campo es obligatorio, email es para validar que el campo sea un email,
    //!minLength es para validar la longitud mínima de un campo, maxLength es para validar la longitud máxima de un campo.
    email: [
      '',
      [
        Validators.required,
        //!NOTA: Para validar un pattern personalizado debemos hacerlo con Validators.pattern('') y dentro de las comillas simples colocar la expresión regular
        //!En nuestro caso se llama a la propiedad emailPattern de ValidatorsService
        Validators.pattern(this.validationService.emailPattern),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(7)]],
    rememberMe: [false, []],
  });

  private usuarios?: Usuarios;
  public respuesta?: Login;

  onSubmit() {
    //console.log(this.loginForm.get('email')?.value)
    //!Evaluamos si el formulario es invalido de acuerdo a los validadores que le asignamos
    if (this.loginForm.invalid) {
      //!Si es invalido marcamos todos los campos como touched. Lo cual detona que aparezcan los errores en la pantalla
      this.loginForm.markAllAsTouched();
      //!Si el formulario es invalido no retornamos nada, hacemos esto para que no se ejecute nada mas si el formulario tiene informacion no valida
      return;
    }

    //console.log(this.loginForm.value);

    //!Creamos un objeto de tipo loginFields, el cual usamos para el login del usuario
    const resp: LoginFields = {
      //!Tomamos los valores del formulario accediendo a value.email, el cual es el nombre que le dimos al campo en el formGroup
      //!Tambien puede accederse al value de la siguiente manera: this.loginForm.get('email')?.value
      //!El || '' indica que si el value es null o undefined, entonces le agregamos un string vacio, esto para evitar errores
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };

    //console.log(resp)

    /* this.authService.getUsuarios().subscribe((usuarios) => {
      //console.log(usuarios);
    }); */

    //!Llama a el metodo login del servicio, el cual recibe un objeto de tipo LoginFields el cual contiene los campos email y password
    /* 
    !export interface LoginFields {
    !email: string;
    !password: string;}
    */
    //!El metodo login devuelve un observable de tipo Login
    this.authService.login(resp).subscribe(
      //!Como es un objeto de tipo Login, se puede acceder a sus propiedades
      /* 
        !export interface Login {
        !ok: boolean;
        !msg: string;
        !respuesta: Respuesta;
        !error: LoginError;}
      */
      (respuesta) => {
        //console.log(respuesta.respuesta.token)
        //!Asignamos la respuesta a la propiedad respuesta que tambien es de tipo Login
        this.respuesta = respuesta;
        //!Mostramos un snackbar de Material con el mensaje de que el login fue correcto
        this.snackbar.open('Correcto', 'Cerrar', {
          duration: 3000,
        });
        //!Guardamos el token en el localStorage con localStorage.setItem este metodo recibe dos parametros, el nombre o key y el valor
        //!le ponemos como nombre o key 'token', usamos JSON.stringify para convertir el objeto a string y guardarlo en el localStorage
        localStorage.setItem('token', JSON.stringify(respuesta.respuesta?.token));
        //!Redirigimos al usuario a la ruta /restricted/inicio con el metodo navigateByUrl de Router
        this.router.navigateByUrl('/restricted/inicio');
      },
      //!Se captura el error de tipo Login, se le agrega el tipo para que se pueda acceder a sus propiedades
      (error: Login) => {
        //console.log('Error component',error);
        //!Mostramos un snackbar de Material con el mensaje de error que viene de la API en el campo msg
        this.snackbar.open(error.error.msg, 'Cerrar', {
          duration: 3000,
        });
      }
    );

    //!Marca todos los campos como tocados, para que se muestren los mensajes de error
    //this.loginForm.markAllAsTouched();
    //this.router.navigateByUrl('/restricted/inicio');
  }

  //!Metodo que se utiliza para saber si un campo es valido o no, recibe un formGroup y el nombre del campo
  isValidField(form: FormGroup, field: string): boolean | null {
    //!Llama al metodo isValidField de ValidatorsService, el cual recibe un formGroup y el nombre del campo yn retorna un booleano o null
    return this.validationService.isValidField(form, field);
  }

  //!Metodo que se utiliza para obtener el mensaje de error de un campo, recibe un formGroup y el nombre del campo
  getFieldError(form: FormGroup, field: string): string | null {
    //!Llama al metodo getFieldError de ValidatorsService, el cual recibe un formGroup y el nombre del campo y retorna un string o null
    return this.validationService.getFieldError(form, field);
  }

  constructor(
    //!FormBuilder se utiliza para crear formularios reactivos en angular
    private formBuilder: FormBuilder,
    //!Router se utiliza para usar los metodos de navegación de angular por ejemplo navigateByUrl, navigate, routerLink, etc.
    private router: Router,
    //!ActivatedRoute se utiliza para obtener los parametros de la URL, por ejemplo si se quiere obtener el id de una ruta como /usuarios/:id
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private validationService: ValidatorsService,
    private snackbar: MatSnackBar
  ) {}
}
