import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuarios } from '../../interfaces/usuarios.interface';
import { Login, LoginFields } from '../../interfaces/login.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    rememberMe: [false, []],
  });

  private usuarios?: Usuarios;
  public respuesta?: Login;

  onSubmit() {
    if (this.loginForm.invalid) return;

    console.log(this.loginForm.value);

    const resp:LoginFields = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    }

    //console.log(resp)

    this.authService.getUsuarios().subscribe((usuarios) => {
      console.log(usuarios);
    });

    this.authService.login(resp).subscribe(respuesta =>{
      //console.log(respuesta)
      this.respuesta = respuesta;
    })

    //this.router.navigateByUrl('/restricted/inicio');
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}
}
