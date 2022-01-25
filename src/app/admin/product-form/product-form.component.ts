import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  public mobileQuery: MediaQueryList;
  private _screenQueryListener: () => void;
  public categories$: Observable<{ key:string | null, value:Category | null }[]>;
  public product: { key: string | null; value: Product | null; } = {key: '', value: {name: '', price: 0, category: '', imageUrl: ''}};
  public id: string = '';

  constructor(public changeDetectorRef: ChangeDetectorRef,
              public media: MediaMatcher,
              public categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,) { 
    // Register screen event listener
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._screenQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._screenQueryListener);
    // Get categories
    this.categories$ = categoryService.getCategoriesWithKey$();
    //Get id from route for existing products
    this.id = this.route.snapshot.paramMap.get('id')??'';
    if (this.id) this.productService.getProduct$(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._screenQueryListener);
  }

  save(product: Product){
    if(this.id) this.productService.update(product, this.id);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(confirm('Are you sure you want to delete this product')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  get productName(): string { return this.product.value?.name ?? ''; };
  set productName(n: string) { this.product.value ? this.product.value.name = n : this.product.value = {name: n, price: this.productPrice, category: this.productCategory, imageUrl: this.productImageUrl}};
  
  get productPrice(): number { return this.product.value?.price ?? 0; };
  set productPrice(p: number) { this.product.value ? this.product.value.price = p : this.product.value = {name: this.productName, price: p, category: this.productCategory, imageUrl: this.productImageUrl}};
  
  get productCategory(): string { return this.product.value?.category ?? ''; };
  set productCategory(c: string) { this.product.value ? this.product.value.category = c : this.product.value = {name: this.productName, price: this.productPrice, category: c, imageUrl: this.productImageUrl}};
  
  get productImageUrl(): string { return this.product.value?.imageUrl ?? ''; };
  set productImageUrl(i: string) { this.product.value ? this.product.value.imageUrl = i : this.product.value = {name: this.productName, price: this.productPrice, category: this.productCategory, imageUrl: i}};
}
