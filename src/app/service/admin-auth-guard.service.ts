import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.appUser$
    .pipe(map(appUser => {
      if(appUser?.isAdmin) return true;

      this.router.navigate(['']);
      return false;
    }));
    
    // return this.auth.user$
    // .pipe(switchMap(user => {
    //   if(user) return this.userService.getAppUser$(user.uid)

    //   this.router.navigate(['']);
    //   return new Observable<AppUser>();
    // }))
    // .pipe(map(appUser => {
    //   if(appUser?.isAdmin) return true;

    //   this.router.navigate(['']);
    //   return false;
    // }));
  }
}
