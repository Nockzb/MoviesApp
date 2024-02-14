import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    @Inject(MAT_DIALOG_DATA) public loca: User[]
  ) {

  }

  ngOnInit() {
  }
}
