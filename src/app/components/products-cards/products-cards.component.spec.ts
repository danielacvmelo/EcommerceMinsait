import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsCardsComponent } from './products-cards.component';

describe('ProductsCardsComponent', () => {
  let component: ProductsCardsComponent;
  let fixture: ComponentFixture<ProductsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCardsComponent);
    component = fixture.componentInstance;

    component.product = {
      id: 1,
      name: 'Produto Teste',
      description: 'Descrição teste',
      price: 100,
      image: 'imagem-fake.jpg',
      stock: 10,
      barcode: '123'
    };
    
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve desabilitar o botão se o estoque for zero', () => {
    component.product.stock = 0;
    
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue(); 
  });

  it('deve chamar o método addToCart quando clicar no botão', () => {
    component.product.stock = 10;
    fixture.detectChanges();

    spyOn(component, 'addToCart');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.addToCart).toHaveBeenCalled();
  });
});
