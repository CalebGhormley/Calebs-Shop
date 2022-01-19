import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../account/login/login.component';
import { AuthService } from '../service/auth.service';
import { OnDisconnect } from 'firebase/database';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnDestroy {
  public mobileQuery: MediaQueryList;
  private _screenQueryListener: () => void;

  constructor(public changeDetectorRef: ChangeDetectorRef,
              public dialog: MatDialog,
              public media: MediaMatcher,
              public auth: AuthService,
              private userService: UserService,) 
  {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._screenQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._screenQueryListener);
    auth.user$.subscribe(user => {
      if(user) {
        userService.save(user);
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._screenQueryListener);
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
