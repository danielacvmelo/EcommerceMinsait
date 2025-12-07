import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:8080/v1/products/'; 

  const mockProducts: Product[] = [
    { id: 1, name: 'Prod A', price: 10, description: 'Desc A', image: 'img.jpg', stock: 5, barcode: '111' },
    { id: 2, name: 'Prod B', price: 20, description: 'Desc B', image: 'img.jpg', stock: 0, barcode: '222' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar uma lista de produtos', () => {
    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products[0].name).toBe('Prod A');
    });

    const req = httpMock.expectOne(apiUrl); 
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('deve criar um produto novo (createProduct)', () => {
    const newProduct = { ...mockProducts[0], id: 3, name: 'Novo' };

    service.createProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}product`); 
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('deve atualizar um produto (updateProduct)', () => {
     const updatedProduct = { ...mockProducts[0], name: 'Editado' };

     service.updateProduct(updatedProduct).subscribe(product => {
        expect(product.name).toBe('Editado');
     });

     const req = httpMock.expectOne(`${apiUrl}update`);
     expect(req.request.method).toBe('PUT');
     req.flush(updatedProduct);
  });

  it('deve deletar um produto (deleteProduct)', () => {
    service.deleteProduct(1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});