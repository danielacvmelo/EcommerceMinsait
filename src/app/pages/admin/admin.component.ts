import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';
import { HttpErrorResponse } from '@angular/common/http'; 

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
      next: (data) => {
        this.products = data;
        console.log('Produtos carregados:', data); 
      },
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }

  handleEdit(product: Product) {
   
    if (!product.id) {
      alert('Erro: Este produto não possui um ID válido para edição.');
      console.error('Tentativa de editar produto sem ID:', product);
      return;
    }
    
    console.log('Navegando para edição do ID:', product.id);
    this.router.navigate(['/admin/editar', product.id]);
  }

  handleDelete(id: number) {
   
    if(!id) {
        alert('ID inválido para exclusão.');
        return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
     
        this.products = this.products.filter(p => p.id !== id);
        alert('Produto excluído com sucesso!');
      },
      error: (err: HttpErrorResponse) => {
     
        console.error('Erro detalhado da API:', err);
        
        if (err.status === 409 || err.status === 500) {
       
            alert('Não é possível excluir este produto pois ele já possui vendas ou vínculos no histórico.');
        } else if (err.status === 404) {
            alert('Produto não encontrado no servidor.');
        } else {
            alert(`Erro ao excluir: ${err.message}`);
        }
      }
    });
  }
}
