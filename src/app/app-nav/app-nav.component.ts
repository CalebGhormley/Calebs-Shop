import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { LoginComponent } from '../account/login/login.component';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent {
  public mobileQuery: MediaQueryList;
  public user!: firebase.User | null;

  _mobileQueryListener: () => void;

  constructor(public changeDetectorRef: ChangeDetectorRef,
              public dialog: MatDialog,
              public media: MediaMatcher,
              private angularFireAuth: AngularFireAuth,) 
  {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    angularFireAuth.authState.subscribe(user => this.user = user);
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
    });
  }

  isNotMobile(): boolean {
    return !this.mobileQuery.matches;
  }
}
