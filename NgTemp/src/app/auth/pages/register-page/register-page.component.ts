import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from 'src/app/shared/services/validators/validators.service';
import { Login, RegisterFields } from '../../interfaces/login.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  public registerForm: FormGroup = this.FormBuilder.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.validationService.firstNameAndLastnamePattern
          ),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validationService.emailPattern),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        this.validationService.isPasswordOneEqualToPasswordTwo(
          'password',
          'confirmPassword'
        ),
      ],
    }
  );

  private respuesta?: Login;

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    //console.log(this.registerForm.value);

    const resp: RegisterFields = {
      nombre: this.registerForm.get('nombre')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.authService.register(resp).subscribe(
      (respuesta) => {
        this.respuesta = respuesta;
        this.snackbar.open('Usuario creado correctamente', 'Cerrar', {
          duration: 3000,
        });
        //TODO DESCOMENTAR Y HACER LA LOGICA DE INICIO DE SESION CUANDO UN USUARIO SEA REGISTRADO
        /* localStorage.setItem('token', JSON.stringify(respuesta.respuesta?.token));
        this.router.navigateByUrl('/restricted/inicio'); */
      },
      (error: Login) => {
        console.log(error)
        this.snackbar.open('error.error.msg', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  isValidField(form: FormGroup, field: string): boolean | null {
    return this.validationService.isValidField(form, field);
  }

  getFieldError(form: FormGroup, field: string): string | null {
    return this.validationService.getFieldError(form, field);
  }

  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private validationService: ValidatorsService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
}
