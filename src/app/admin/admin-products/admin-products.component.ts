import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['productNumber', 'name', 'price', 'edit'];
  public products$: Observable<{ key: string | null, value: Product | null }[]>;
  public products: { key: string | null, value: Product | null }[] = [];
  public filteredProducts: { key: string | null, value: Product | null }[] = [];
  private subscription: Subscription;

  constructor(private productService: ProductService) { 
    this.products$ = this.productService.getProducts$();
    this.subscription = this.products$.subscribe(products => {
      this.filteredProducts = this.products = products;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.value?.name.toLowerCase().includes(query.toLowerCase())) :
      this. products;
  }
}
