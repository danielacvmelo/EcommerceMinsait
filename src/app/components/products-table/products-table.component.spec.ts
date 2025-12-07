import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsTableComponent } from './products-table.component';
import { Product } from '../../models/product.model'; 

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    
    spyOn(component.edit, 'emit');
    spyOn(component.delete, 'emit');
    spyOn(window, 'alert');
    spyOn(window, 'confirm');
    spyOn(console, 'error');
  });

  const mockProduct: Product = { 
    id: 1, 
    name: 'Teste', 
    price: 10, 
    stock: 5,
    barcode: 'COD-123',
    description: 'Descrição teste',
    image: 'http://img.com',
  };

  it('deve emitir evento de edição ao clicar no botão', () => {
    component.onEdit(mockProduct);
    expect(component.edit.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('deve emitir evento de exclusão se confirmado', () => {
    (window.confirm as jasmine.Spy).and.returnValue(true); 

    component.onDelete(mockProduct);
    
    expect(window.confirm).toHaveBeenCalledWith(jasmine.stringMatching('Teste'));
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  it('não deve emitir exclusão se usuário cancelar', () => {
    (window.confirm as jasmine.Spy).and.returnValue(false); 

    component.onDelete(mockProduct);
    
    expect(component.delete.emit).not.toHaveBeenCalled();
  });

  it('deve exibir erro se tentar excluir produto sem ID', () => {
    const productSemId = { ...mockProduct, id: undefined };
    
    component.onDelete(productSemId as Product);

    expect(window.alert).toHaveBeenCalledWith('Erro: Este produto ainda não possui um ID sincronizado. Recarregue a página.');
    expect(component.delete.emit).not.toHaveBeenCalled();
  });
});