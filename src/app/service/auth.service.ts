import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User | null>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,) 
  { 
    this.user$ = angularFireAuth.authState;
  }

  loginWithGoogle() {
    this.angularFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$
    .pipe(switchMap(user => {
      if(user) return this.userService.getAppUser$(user.uid)

      this.router.navigate(['']);
      return new Observable<AppUser>();
    }));
  }
}
