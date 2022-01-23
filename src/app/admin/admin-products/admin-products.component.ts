import { Component, OnInit } from '@angular/core';

export interface Product {
  productNumber: number;
  name: string;
  price: number;
  picture: string;
  productId: string;
}

const PRODUCT_DATA: Product[] = [
  {productNumber: 1, name: 'Hydrogen', price: 1.0079, picture: 'H', productId: '1'},
  {productNumber: 2, name: 'Helium', price: 4.0026, picture: 'He', productId: '1'},
  {productNumber: 3, name: 'Lithium', price: 6.941, picture: 'Li', productId: '1'},
  {productNumber: 4, name: 'Beryllium', price: 9.0122, picture: 'Be', productId: '1'},
  {productNumber: 5, name: 'Boron', price: 10.811, picture: 'B', productId: '1'},
  {productNumber: 6, name: 'Carbon', price: 12.0107, picture: 'C', productId: '1'},
  {productNumber: 7, name: 'Nitrogen', price: 14.0067, picture: 'N', productId: '1'},
  {productNumber: 8, name: 'Oxygen', price: 15.9994, picture: 'O', productId: '1'},
  {productNumber: 9, name: 'Fluorine', price: 18.9984, picture: 'F', productId: '1'},
  {productNumber: 10, name: 'Neon', price: 20.1797, picture: 'Ne', productId: '1'},
];

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = ['productNumber', 'name', 'price', 'edit'];
  dataSource = PRODUCT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
