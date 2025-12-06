import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/v1/products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => {
        return products.map(p => ({
          ...p,
          image: `https://picsum.photos/seed/${p.id}/300/300`,
          description: p.description || 'Produto de alta tecnologia com garantia Minsait.'
        }));
      })
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}product`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}update`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}