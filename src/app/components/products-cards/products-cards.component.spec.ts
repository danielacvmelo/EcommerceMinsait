import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsCardsComponent } from './products-cards.component';
import { CartService } from '../../services/cart.service';

describe('ProductsCardsComponent', () => {
  let component: ProductsCardsComponent;
  let fixture: ComponentFixture<ProductsCardsComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      imports: [ProductsCardsComponent],
      providers: [
        { provide: CartService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCardsComponent);
    component = fixture.componentInstance;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;

    component.product = {
      id: 1,
      name: 'Teste',
      price: 100,
      description: 'Desc',
      image: 'img.jpg',
      barcode: '111',
      stock: 5 
    };

    spyOn(window, 'alert'); 
    
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar 10 no getter stock (lógica fixa do seu código)', () => {
    expect(component.stock).toBe(10);
  });

  it('deve retornar "0%" no getter discount (lógica fixa do seu código)', () => {
    expect(component.discount).toBe('0%');
  });

  it('deve chamar cartService.addToCart e alert ao clicar no botão', () => {
    component.addToCart();
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(component.product);
    expect(window.alert).toHaveBeenCalledWith(`${component.product.name} foi adicionado ao carrinho!`);
  });
});
