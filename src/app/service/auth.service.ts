import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User | null>;

  constructor(
    private angularFireAuth: AngularFireAuth,) 
  { 
    this.user$ = angularFireAuth.authState;
  }

  loginWithGoogle(){
    this.angularFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  authState() {
    return this.angularFireAuth.authState;
  }
}
