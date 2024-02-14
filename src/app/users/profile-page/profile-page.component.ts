import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  // perfilForm!: FormGroup;

  constructor(
              private snackBar: MatSnackBar,
              private usuarioService: UsersService
              ) { }

  ngOnInit() { }
}


    // console.log(localStorage.getItem('nombre_publico'));
  //   this.perfilForm = new FormGroup({
  //     // query: new FormControl('perfil'),
  //     correoUsuario: new FormControl(localStorage.getItem('usuario')),
  //     nombrePublico: new FormControl(localStorage.getItem('nombre_publico')),
  //     nuevaPassword: new FormControl(''),
  //     confirmarNuevaPassword: new FormControl('')
  //   }, passMatchValidator); // Pasar la función como argumento aquí
  // }


//   async actualizarPerfil() {
//     if (this.perfilForm.valid) {
//       const RESP = await this.usuarioService.editUser(this.perfilForm.value , 'profile').toPromise();
//       if (RESP!.ok) {
//         this.snackBar.open("Perfil actualizado correctamente.", "Cerrar", { duration: 5000 });
//       } else {
//         this.snackBar.open("Error al actualizar el perfil.", "Cerrar", { duration: 5000 });
//       }
//     } else {
//       this.snackBar.open("Formulario no válido.", "Cerrar", { duration: 5000 });
//     }
//   }
// }

// Esta función debe estar fuera de la clase ProfilePageComponent
// export function passMatchValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const nuevaPassword = control.get('nuevaPassword');
//     const confirmarNuevaPassword = control.get('confirmarNuevaPassword');

//     if (nuevaPassword && confirmarNuevaPassword && nuevaPassword.value === confirmarNuevaPassword.value) {
//       return null;
//     } else {
//       return { mismatch: true };
//     }
//   };
// }


// passMatchValidator(g: FormGroup) {
//   return g.get('nuevaPassword').value === g.get('confirmarNuevaPassword').value
//     ? null : { mismatch: true };
// }
