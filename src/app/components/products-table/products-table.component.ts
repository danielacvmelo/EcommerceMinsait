import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css' 
})
export class ProductsTableComponent {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<number>(); 

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(product: Product) {
    if (!product.id) {
      console.error('Erro: Tentativa de excluir produto sem ID (provavelmente recém-criado sem refresh).');
      alert('Erro: Este produto ainda não possui um ID sincronizado. Recarregue a página.');
      return;
    }

    if (confirm(`Tem certeza que deseja excluir "${product.name}"?`)) {
      this.delete.emit(product.id);
    }
  }
}