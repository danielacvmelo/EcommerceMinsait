import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { of, throwError } from 'rxjs';
import { Router, provideRouter } from '@angular/router';
import { Component, Input } from '@angular/core';
@Component({ selector: 'app-products-table', standalone: true, template: '' })
class MockProductsTableComponent { @Input() products: any[] = []; }

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let service: ProductService;
  let router: Router;

  const mockProducts = [{ id: 1, name: 'P1', price: 10, barcode: '1', stock: 5 }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent, HttpClientTestingModule],
      providers: [ProductService, provideRouter([])]
    })
    .overrideComponent(AdminComponent, {
      remove: { imports: [] },
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
    spyOn(console, 'error');
  });

  it('deve carregar produtos no inicio', () => {
    fixture.detectChanges();
    expect(component.products.length).toBe(1);
  });

  it('deve tratar erro ao carregar produtos', () => {
    service.getProducts = jasmine.createSpy().and.returnValue(throwError(() => 'Erro Load'));
    
    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith('Erro ao carregar produtos', 'Erro Load');
  });

  it('deve navegar ao editar', () => {
    fixture.detectChanges();
    component.handleEdit(mockProducts[0]);
    expect(router.navigate).toHaveBeenCalledWith(['/admin/editar', 1]);
  });

  it('deve deletar com sucesso', () => {
    fixture.detectChanges();
    component.handleDelete(1);
    expect(service.deleteProduct).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith('Produto excluído com sucesso!');
  });

  it('deve tratar erro ao deletar', () => {
    fixture.detectChanges();
    service.deleteProduct = jasmine.createSpy().and.returnValue(throwError(() => 'Erro Delete'));

    component.handleDelete(1);

    expect(window.alert).toHaveBeenCalledWith('Erro ao excluir produto.');
  });
});