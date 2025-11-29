import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard], 
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  productsList = [
    {
      name: 'Camiseta Preta',
      description: 'Camiseta de algodão 100%, confortável e estilosa.',
      price: 'R$ 49,90',
      discount: '10%',
      stock: 100,
      image: 'images/product-card/camiseta.png'
    },
    {
      name: 'Tênis Esportivo',
      description: 'Tênis de alta performance para corridas e treinos.',
      price: 'R$ 299,90',
      discount: '15%',
      stock: 50,
      image: 'images/product-card/tenis.png'
    },
    {
      name: 'Headphone',
      description: 'Cancelamento de ruído avançado.',
      price: 'R$ 459,90',
      discount: '5%',
      stock: 0,
      image: 'images/product-card/headphone.png'
    }
  ];
}