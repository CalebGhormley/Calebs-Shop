import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
  public nameFormControl = new FormControl('', [Validators.required]);
  public priceFormControl = new FormControl('', [Validators.required, Validators.min(0)]);
  public categoryFormControl = new FormControl('', [Validators.required]);
  public imageUrlFormControl = new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]);

  constructor(public changeDetectorRef: ChangeDetectorRef,
              public media: MediaMatcher,
              public categoryService: CategoryService,
              private productService: ProductService,) { 
    // Register screen event listener
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._screenQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._screenQueryListener);
    // Get categories
    this.categories$ = categoryService.getCategoriesWithKey$();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._screenQueryListener);
  }

  save(product: Product){
    this.productService.create(product);
  }
}
