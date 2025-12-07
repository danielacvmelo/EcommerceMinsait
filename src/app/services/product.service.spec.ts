import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/v1/products/';

  const mockProducts: Product[] = [
    { id: 1, name: 'P1', price: 10, barcode: '1', description: '', image: '', stock: 5 }
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

  it('deve retornar produtos com imagem transformada (getProducts)', () => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].image).toBe('https://picsum.photos/id/107/300/300');
      expect(products[0].description).toBe('Produto de alta tecnologia com garantia Minsait.');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([{ ...mockProducts[0], description: null }]); 
  });

  it('deve criar produto (createProduct)', () => {
    service.createProduct(mockProducts[0]).subscribe(prod => {
      expect(prod).toEqual(mockProducts[0]);
    });

    const req = httpMock.expectOne(`${apiUrl}product`);
    expect(req.request.method).toBe('POST');
    req.flush(mockProducts[0]);
  });

  it('deve atualizar produto (updateProduct)', () => {
    service.updateProduct(mockProducts[0]).subscribe(prod => {
      expect(prod).toEqual(mockProducts[0]);
    });

    const req = httpMock.expectOne(`${apiUrl}update`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockProducts[0]);
  });

  it('deve deletar produto (deleteProduct)', () => {
    service.deleteProduct(1).subscribe(res => expect(res).toBeNull());

    const req = httpMock.expectOne(`${apiUrl}1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});