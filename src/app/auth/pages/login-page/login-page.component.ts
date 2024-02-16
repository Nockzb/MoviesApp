import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/shared/common.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  @Output() valueChange = new EventEmitter();

  loginForm!: FormGroup;
  titulo = 'LOG IN';
  alerta!: string;
  showSpinner!: boolean;
  error!: string;

  constructor(
              private authService: AuthService,
              private router: Router,
              private cookieService: CookieService,
              private snackBar: MatSnackBar,
              private commonService: CommonService
            ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async acceder() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      const RESPONSE = await this.authService.doLogin(data).toPromise();

      if (RESPONSE) {
        if (RESPONSE.ok) {
          if (RESPONSE.data.token) {
            // this.cookieService.set('token', RESPONSE.data.token);
            // console.log('ya he puesto el token');
            localStorage.setItem('token', RESPONSE.data.token);
            localStorage.setItem('usuario', RESPONSE.data.usuario);
            localStorage.setItem('nombre_publico', RESPONSE.data.nombre_publico);
            localStorage.setItem('ultimaOpcion', RESPONSE.data.opcion);
            localStorage.setItem('ultimoGrupo', RESPONSE.data.grupo);
            localStorage.setItem('id_rol', RESPONSE.data.id_rol);
            this.commonService.headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${RESPONSE.data.token}`
            });

            console.log(localStorage['nombre_publico'])
            this.router.navigate([`/movies/home`]);

          } else if (RESPONSE.data.valido === 0) {
            this.snackBar.open('Usuario inhabilitado', 'Cerrar', { duration: 5000 });
          } else if (RESPONSE.data.valido === 1) {
            this.snackBar.open('Usuario o contraseña incorrectas', 'Cerrar', { duration: 5000 });
          }
        }
      }
    }
  }

  forgotPassword() {
      this.valueChange.emit(true);
  }

}
