import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';

import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  // nivelIngles = ["A1", "A2", "B1", "B2", "C1", "C2"]
  // alumnoForm: FormGroup;
  // unidadesCentro: UnidadCentro[];

  // ENTIDAD: String;

  // constructor(public dialogRef: MatDialogRef<AddUserComponent>,
  //   private snackBar: MatSnackBar,
  //   private servicioAlumnos: UsersService,
  //   private servicioUnidadesCentro: UnidadesCentroService,
  //   @Inject(MAT_DIALOG_DATA) public id_unidad_centro: number,
  //   private datePipe: DatePipe
  // ){ }

  ngOnInit(): void {
  //   this.alumnoForm = new FormGroup({
  //     id_alumno: new FormControl(0),
  //     dni: new FormControl(null, Validators.required),
  //     nombre: new FormControl(null, Validators.required),
  //     apellidos: new FormControl(null, Validators.required),
  //     fecha_nacimiento: new FormControl(null),
  //     linkedin: new FormControl(null, [Validators.required, LinkedinValidator()]),
  //     nivel_ingles: new FormControl(null),
  //     minusvalia: new FormControl(0, [Validators.min(0), Validators.max(100)]),
  //     otra_formacion: new FormControl(null),
  //     id_unidad_centro: new FormControl(this.id_unidad_centro),
  //   });
  //   this.ENTIDAD = ENTIDAD_ALUMNO;

    // this.getUnidadesCentro();

  }

//    // Método para manejar los eventos de cambio de fecha
//    dateChange(event: MatDatepickerInputEvent<Date>) {
//     this.alumnoForm.get('fecha_nacimiento').setValue(event.value);
//   }

//   async confirmAdd() {
//     if (this.alumnoForm.valid) {
//       const alumno = this.alumnoForm.value as User;

//     // Formatea la fecha al formato 'yyyy-MM-dd'
//     alumno.fecha_nacimiento = this.datePipe.transform(alumno.fecha_nacimiento, 'yyyy-MM-dd');

//       const RESPONSE = await this.servicioAlumnos.addAlumno(alumno).toPromise();
//       if (RESPONSE.ok) {
//         this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
//         this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
//       } else {
//         if (RESPONSE.message === 'LinkedInvalid') {
//           // Muestra un Snackbar específico para el error de LinkedIn
//           this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
//         } else {
//           // Muestra un Snackbar genérico para otros errores
//           this.snackBar.open('Ocurrió un fallo', CLOSE, { duration: 5000 });
//         }
//       }
//     } else {
//       this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
//     }
//   }

//   async getUnidadesCentro(){
//     const RESPONSE = await this.servicioUnidadesCentro.getAllUnidadesCentro().toPromise();
//     if (RESPONSE.ok){
//       this.unidadesCentro = RESPONSE.data as UnidadCentro[];
//     }
//   }

//   onDateChange(event: MatDatepickerInputEvent<Date>) {
//     // Formatea la fecha antes de asignarla al formulario si es necesario
//     const formattedDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
//     this.alumnoForm.get('fecha_nacimiento').setValue(formattedDate);
// }


//   decrementar() {
//     const valorActual = this.alumnoForm.get('minusvalia').value;
//     const nuevoValor = Math.max(valorActual - 5, 0);
//     this.alumnoForm.get('minusvalia').setValue(nuevoValor);
//   }

//   incrementar() {
//     const valorActual = this.alumnoForm.get('minusvalia').value;
//     const nuevoValor = Math.min(valorActual + 5, 100);
//     this.alumnoForm.get('minusvalia').setValue(nuevoValor);
//   }

  // onNoClick() {
  //   this.dialogRef.close({ok: false});
  // }
}
