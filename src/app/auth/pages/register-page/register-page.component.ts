import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {
  @Output() valueChange = new EventEmitter();

  registerForm!: FormGroup;
  titulo = 'REGISTER';

  constructor(
    public dialogRef: MatDialogRef<RegisterPageComponent>,
    private usuarioService: UsersService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      id_rol: ['', Validators.required],
      nombre_publico: [''],
      observaciones: ['']
    });
  }

  // async register() {
  //   if (this.registerForm.valid) {
  //     const usuario = this.registerForm.value;
  //     const RESPONSE = await this.usuarioService.addUsuario(usuario).toPromise();
  //     if (RESPONSE.ok) {
  //       this.snackBar.open(RESPONSE.message, 'Cerrar', { duration: 5000 });
  //       this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
  //     } else {
  //       this.snackBar.open(RESPONSE.message, 'Cerrar', { duration: 5000 });
  //     }
  //   } else {
  //     this.snackBar.open('Formulario inválido', 'Cerrar', { duration: 5000 });
  //   }
  // }

  onCancel(): void {
    this.dialogRef.close({ok: false});
  }
}
