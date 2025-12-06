import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductsFormComponent } from './pages/products-form/products-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
    { path: 'carrinho', component: CartComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/novo', component: ProductsFormComponent },
  { path: 'admin/editar/:id', component: ProductsFormComponent },
  { path: '**', redirectTo: '' }
];