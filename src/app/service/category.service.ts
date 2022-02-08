import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  public getCategories$(): Observable<{ key:string | null, value:Category | null }[]> {
    let categories: AngularFireList<Category> = this.db.list('/categories', ref => {
      return ref.orderByChild('name');
    });
    return categories.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, value: c.payload.val() }))
      )
    );
  }
}
