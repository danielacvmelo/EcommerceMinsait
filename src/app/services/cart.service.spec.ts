import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;
  
  const mockProduct: Product = {
    id: 1, name: 'Prod 1', price: 10, description: '', image: '', barcode: '111', stock: 10
  };

  beforeEach(() => {
    localStorage.clear();
    
    TestBed.configureTestingModule({
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve adicionar um produto novo ao carrinho', () => {
    service.addToCart(mockProduct);
    
    expect(service.getItemCount()).toBe(1);
    expect(service.getTotal()).toBe(10);
  });

  it('deve incrementar quantidade se adicionar o mesmo produto', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct); 

    expect(service.getItemCount()).toBe(2); 
    expect(service.getTotal()).toBe(20);
    
    service.cartItems$.subscribe(items => {
      expect(items.length).toBe(1); 
      expect(items[0].quantity).toBe(2);
    });
  });

  it('deve remover um item do carrinho', () => {
    service.addToCart(mockProduct);
    service.removeFromCart(1); 

    expect(service.getItemCount()).toBe(0);
  });

  it('deve limpar o carrinho', () => {
    service.addToCart(mockProduct);
    service.clearCart();

    expect(service.getItemCount()).toBe(0);
  });

  it('deve carregar dados do localStorage ao iniciar (loadCart)', () => {
   
    const savedCart = JSON.stringify([{ ...mockProduct, quantity: 5 }]);
    localStorage.setItem('minsait-cart', savedCart);
    const manualService = new CartService();

    expect(manualService.getItemCount()).toBe(5);
  });
});