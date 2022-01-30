import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminAuthGuard } from './service/admin-auth-guard.service';
import { AuthGuard } from './service/auth-guard.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent
  },
  {
    path: 'cart', 
    component: ShoppingCartComponent
  },
  {
    path: 'checkout', 
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order-success', 
    component: OrderSuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my/orders', 
    component: MyOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/orders', 
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/new', 
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/:id', 
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products', 
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: '**', 
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
