import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  productId?: number;

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      barcode: ['', [Validators.required]],
      description: [''],
      image: [''] 
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProductData(this.productId);
      }
    });
  }

  loadProductData(id: number) {
    this.productService.getProducts().subscribe(products => {
      const product = products.find(p => p.id === id);
      if (product) {
        this.form.patchValue(product);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const productData: Product = this.form.value;

    if (this.isEditMode && this.productId) {
      productData.id = this.productId;

      this.productService.updateProduct(productData).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.router.navigate(['/admin']);
        },
        error: (err) => alert('Erro ao atualizar.')
      });

    } else {
      this.productService.createProduct(productData).subscribe({
        next: () => {
          alert('Produto criado com sucesso!');
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao criar.');
        }
      });
    }
  }
}
