import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'minsait-cart'; 
  
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCart(); 
  }
  
  private saveCart(items: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  private loadCart() {
    const saved = localStorage.getItem(this.cartKey);
    if (saved) {
      this.cartItemsSubject.next(JSON.parse(saved));
    }
  }

  addToCart(product: Product) {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
    
      existingItem.quantity++;
      this.saveCart([...currentItems]);
    } else {
     
      const newItem: CartItem = { ...product, quantity: 1 };
      this.saveCart([...currentItems, newItem]);
    }
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItemsSubject.value;
    const filteredItems = currentItems.filter(item => item.id !== productId);
    this.saveCart(filteredItems);
  }

  clearCart() {
    this.saveCart([]);
  }

  getTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  getItemCount(): number {
    return this.cartItemsSubject.value.reduce((count, item) => count + item.quantity, 0);
  }
}