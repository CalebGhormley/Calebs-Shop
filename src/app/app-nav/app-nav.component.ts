import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../account/login/login.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent {
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public changeDetectorRef: ChangeDetectorRef,
              public dialog: MatDialog,
              public media: MediaMatcher,
              public auth: AuthService,) 
  {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
    });
  }

  logout() {
    this.auth.logout();
  }
}
