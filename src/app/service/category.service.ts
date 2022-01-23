import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { 

  }

  private getAngularFireCategories(): AngularFireList<Category> {
    return this.db.list('/categories', ref => {
      return ref.orderByChild('name');
    });
  }

  public getCategories$(): Observable<Category[] | null> {
    return this.getAngularFireCategories().valueChanges();
  }

  public getCategoriesWithKey$(): Observable<{ key:string | null, value:Category | null }[]> {
    return this.getAngularFireCategories().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, value: c.payload.val() }))
      )
    );
  }
}
