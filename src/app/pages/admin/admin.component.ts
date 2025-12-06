import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ProductsTableComponent, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  
  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }

  handleEdit(product: Product) {
    this.router.navigate(['/admin/editar', product.id]);
  }

  handleDelete(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        alert('Produto excluído com sucesso!');
      },
      error: (err) => alert('Erro ao excluir produto.')
    });
  }
}
