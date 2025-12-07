import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsTableComponent } from './products-table.component';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;

  const mockProduct = { 
    id: 1, name: 'P1', price: 10, barcode: '1', description: '', image: '', stock: 5 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve emitir evento ao editar', () => {
    spyOn(component.edit, 'emit');
    
    component.onEdit(mockProduct);

    expect(component.edit.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('deve emitir evento ao deletar SE confirmar', () => {
    spyOn(window, 'confirm').and.returnValue(true); 
    spyOn(component.delete, 'emit');

    component.onDelete(mockProduct);

    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  it('NÃO deve emitir evento ao deletar SE cancelar', () => {
    spyOn(window, 'confirm').and.returnValue(false); 
    spyOn(component.delete, 'emit');

    component.onDelete(mockProduct);

    expect(component.delete.emit).not.toHaveBeenCalled();
  });
});
