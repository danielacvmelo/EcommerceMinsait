import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-cards.component.html',
  styleUrl: './products-cards.component.css'
})
export class ProductsCardsComponent {

  @Input() product!: Product;
  
  private cartService = inject(CartService);
  get stock(): number {
    return 10; 
  }

  get discount(): string {
    return '0%';
  }

  
  addToCart() {
    this.cartService.addToCart(this.product);
    alert(`${this.product.name} foi adicionado ao carrinho!`);
  }
}
