import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CartService } from '../../services/cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let cartSubject: BehaviorSubject<any[]>;

  beforeEach(async () => {
    cartSubject = new BehaviorSubject<any[]>([]); 

    const cartServiceMock = {
      cartItems$: cartSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [
        { provide: CartService, useValue: cartServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve atualizar cartCount quando o carrinho mudar (Soma das quantidades)', () => {
    cartSubject.next([
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 }
    ]);

  
    fixture.detectChanges();

    expect(component.cartCount).toBe(5);
  });

  it('deve ter cartCount 0 se a lista estiver vazia', () => {
    cartSubject.next([]);
    fixture.detectChanges();
    expect(component.cartCount).toBe(0);
  });
});