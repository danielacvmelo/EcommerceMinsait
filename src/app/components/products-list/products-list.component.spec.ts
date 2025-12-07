import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { of, throwError } from 'rxjs';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListComponent, HttpClientTestingModule],
      providers: [ProductService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
  });

  it('deve criar e carregar produtos com sucesso', () => {
    spyOn(service, 'getProducts').and.returnValue(of([]));
    
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(service.getProducts).toHaveBeenCalled();
  });

  it('deve lidar com erro ao carregar produtos', () => {
 
    spyOn(service, 'getProducts').and.returnValue(throwError(() => new Error('Erro API')));
    spyOn(console, 'error'); 

    fixture.detectChanges(); 

    expect(console.error).toHaveBeenCalled();
  });
});