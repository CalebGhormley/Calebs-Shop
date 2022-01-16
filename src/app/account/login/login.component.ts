import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private angularFireAuth: AngularFireAuth,
              public dialogRef: MatDialogRef<LoginComponent>)
  { 
    this.matIconRegistry.addSvgIcon(
      `google-icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/google-icon.svg")
    );

  }

  loginWithGoogle() {
    this.angularFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
