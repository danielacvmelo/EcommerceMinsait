import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { Router, provideRouter } from '@angular/router'; 
import { Component, Input } from '@angular/core';
@Component({ selector: 'app-products-table', standalone: true, template: '' })
class MockProductsTableComponent {
  @Input() products: any[] = [];
}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let service: ProductService;
  let router: Router;

  const mockProducts = [
    { id: 1, name: 'P1', price: 10, barcode: '111', description: '', image: '', stock: 10 },
    { id: 2, name: 'P2', price: 20, barcode: '222', description: '', image: '', stock: 5 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminComponent, 
        HttpClientTestingModule
      ],
      providers: [
        ProductService,
        provideRouter([]) 
      ]
    })
    .overrideComponent(AdminComponent, {
      remove: { imports: [ ] },
      add: { imports: [MockProductsTableComponent] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    router = TestBed.inject(Router);

    spyOn(service, 'getProducts').and.returnValue(of(mockProducts));
    spyOn(service, 'deleteProduct').and.returnValue(of(void 0));
    spyOn(router, 'navigate');
    spyOn(window, 'alert');

    fixture.detectChanges();
  });

  it('deve criar e carregar produtos no inicio', () => {
    expect(component).toBeTruthy();
    expect(service.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(2);
  });

  it('deve navegar para a rota de edição correta em handleEdit', () => {
    const prod = mockProducts[0];
    component.handleEdit(prod);
    expect(router.navigate).toHaveBeenCalledWith(['/admin/editar', 1]);
  });

  it('deve deletar produto e remover da lista local em handleDelete', () => {
    expect(component.products.length).toBe(2);
    component.handleDelete(1);
    expect(service.deleteProduct).toHaveBeenCalledWith(1);
    expect(component.products.length).toBe(1);
    expect(component.products[0].id).toBe(2);
  });
});