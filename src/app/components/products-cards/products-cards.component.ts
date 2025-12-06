import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-cards.component.html',
  styleUrl: './products-cards.component.css'
})
export class ProductsCardsComponent {

  @Input() product!: Product; 
  
 
  get stock(): number {
   
    return 10; 
  }
  

  get discount(): string {
    return '0%';
  }
}
