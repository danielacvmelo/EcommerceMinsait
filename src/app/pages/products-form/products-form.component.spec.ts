import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsFormComponent } from './products-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { of, throwError, BehaviorSubject } from 'rxjs'; 
import { ActivatedRoute, Router, provideRouter } from '@angular/router';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  let service: ProductService;
  let router: Router;
  let routeParamsSubject: BehaviorSubject<any>;

  const mockProduct = { 
    id: 1, name: 'Teste', price: 50, barcode: '123', description: '', image: '', stock: 10 
  };

  beforeEach(async () => {
    routeParamsSubject = new BehaviorSubject({});

    await TestBed.configureTestingModule({
      imports: [ProductsFormComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        ProductService,
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { params: routeParamsSubject.asObservable() } 
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
    spyOn(console, 'error'); 
  });

  it('deve carregar dados na edição (loadProductData chamado manualmente)', () => {
    fixture.detectChanges(); 
    component.isEditMode = true;
    component.productId = 1;
    component.loadProductData(1); 

    expect(component.form.get('name')?.value).toBe('Teste');
  });

  it('não deve fazer nada no loadProductData se não achar ID', () => {
    fixture.detectChanges();
    component.loadProductData(99); 
    expect(component.form.get('name')?.value).toBe(''); 
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
    component.form.patchValue(mockProduct); 

    component.onSubmit();

    expect(service.updateProduct).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('não deve enviar se form for inválido', () => {
    fixture.detectChanges();
    component.form.reset(); 
    component.onSubmit();
    
    expect(service.createProduct).not.toHaveBeenCalled();
    expect(service.updateProduct).not.toHaveBeenCalled();
  });

  it('deve exibir alert de erro ao falhar na CRIAÇÃO', () => {
    (service.createProduct as jasmine.Spy).and.returnValue(throwError(() => new Error('Erro API')));
    
    fixture.detectChanges();
    component.form.patchValue({ name: 'Novo', price: 10, barcode: '123' });
    
    component.onSubmit();

    expect(console.error).toHaveBeenCalled(); 
    expect(window.alert).toHaveBeenCalledWith('Erro ao criar.'); 
  });

  it('deve exibir alert de erro ao falhar na ATUALIZAÇÃO', () => {
    (service.updateProduct as jasmine.Spy).and.returnValue(throwError(() => new Error('Erro API')));

    fixture.detectChanges();
    component.isEditMode = true;
    component.productId = 1;
    component.form.patchValue(mockProduct);

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Erro ao atualizar.');
  });
  
  it('deve ativar isEditMode e carregar dados automaticamente no ngOnInit se houver ID na rota', () => {
    routeParamsSubject.next({ id: '1' });
    fixture.detectChanges();
    expect(component.isEditMode).toBeTrue();
    expect(component.productId).toBe(1);
    expect(component.form.get('name')?.value).toBe('Teste');
  });

});