import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject,  } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  getAppUser$(uid:string): Observable<AppUser | null> {
    let user: AngularFireObject<AppUser> = this.db.object('/users/' + uid);
    return user.valueChanges();
  }
}
