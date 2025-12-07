import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceSpy: any;
  let cartSubject: BehaviorSubject<any[]>;

  beforeEach(async () => {
    cartSubject = new BehaviorSubject<any[]>([]);
    cartServiceSpy = jasmine.createSpyObj('CartService', ['getTotal', 'removeFromCart', 'clearCart']);
    cartServiceSpy.cartItems$ = cartSubject.asObservable();
    cartServiceSpy.getTotal.and.returnValue(100);

    await TestBed.configureTestingModule({
      imports: [CartComponent, RouterTestingModule],
      providers: [
        { provide: CartService, useValue: cartServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar e carregar itens e total no inicio', () => {
    cartSubject.next([{ id: 1, name: 'Prod', price: 10, quantity: 1 }]);
    fixture.detectChanges();

    expect(component.cartItems.length).toBe(1);
    expect(cartServiceSpy.getTotal).toHaveBeenCalled();
    expect(component.total).toBe(100);
  });

  it('deve chamar removeFromCart ao remover item', () => {
    component.removeItem(1);
    expect(cartServiceSpy.removeFromCart).toHaveBeenCalledWith(1);
  });

  it('deve chamar clearCart ao limpar carrinho', () => {
    component.clearCart();
    expect(cartServiceSpy.clearCart).toHaveBeenCalled();
  });
});