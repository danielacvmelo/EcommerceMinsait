import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsFormComponent } from './products-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  let service: ProductService;
  let router: Router;

  const mockProduct = { 
    id: 1, name: 'Teste', price: 50, barcode: '123', description: '', image: '', stock: 10 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsFormComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        ProductService,
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) } 
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    router = TestBed.inject(Router);

    spyOn(service, 'createProduct').and.returnValue(of(mockProduct));
    spyOn(service, 'updateProduct').and.returnValue(of(mockProduct));
    spyOn(service, 'getProducts').and.returnValue(of([mockProduct]));
    spyOn(window, 'alert');
    spyOn(router, 'navigate');
  });

  it('deve carregar dados na edição (loadProductData)', () => {
    fixture.detectChanges(); 
    
    component.isEditMode = true;
    component.productId = 1;
    component.loadProductData(1);

    expect(service.getProducts).toHaveBeenCalled();
    expect(component.form.get('name')?.value).toBe('Teste');
  });

  it('deve criar produto com sucesso', () => {
    fixture.detectChanges();
    component.form.patchValue({ name: 'Novo', price: 10, barcode: '123' });

    component.onSubmit();

    expect(service.createProduct).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('deve atualizar produto com sucesso', () => {
    fixture.detectChanges();
    component.isEditMode = true;
    component.productId = 1;
    component.form.patchValue({ name: 'Edit', price: 10, barcode: '123' });

    component.onSubmit();

    expect(service.updateProduct).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('deve lidar com erro na criação', () => {
    service.createProduct = jasmine.createSpy().and.returnValue(throwError(() => 'Erro'));
    spyOn(console, 'error');
    
    fixture.detectChanges();
    component.form.patchValue({ name: 'Novo', price: 10, barcode: '123' });
    
    component.onSubmit();

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Erro ao criar.');
  });
  
  it('não deve enviar se form for inválido', () => {
      fixture.detectChanges();
      component.form.reset(); 
      component.onSubmit();
      expect(service.createProduct).not.toHaveBeenCalled();
  });
});