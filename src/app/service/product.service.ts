import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    this.db.object('/products/' + this.db.createPushId()).set(product);
  }

  update(product: Product, id: string) {
    this.db.object('/products/' + id).update(product);
  }

  delete(id: string) {
    console.log(this.db.object('/products/' + id).remove());
    this.db.object('/products/' + id).remove().then(x => {
      console.log(x);
    });
  }

  private getAngularFireProduct(productId: string): AngularFireObject<Product> {
    return this.db.object('/products/'+productId);
  }

  private getAngularFireProducts(): AngularFireList<Product> {
    return this.db.list('/products', ref => {
      return ref.orderByChild('name');
    });
  }

  public getProduct$(productId: string): Observable<{ key: string | null, value: Product | null }> {
    return this.getAngularFireProduct(productId).snapshotChanges().pipe(
      map(c => 
        ({ key: c.payload.key, value: c.payload.val() })
      )
    );
  }

  public getProducts$(): Observable<{ key: string | null, value: Product | null }[]> {
    return this.getAngularFireProducts().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, value: c.payload.val() }))
      )
    );
  }
}
