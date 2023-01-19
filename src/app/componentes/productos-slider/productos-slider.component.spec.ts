import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosSliderComponent } from './productos-slider.component';

describe('ProductosSliderComponent', () => {
  let component: ProductosSliderComponent;
  let fixture: ComponentFixture<ProductosSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
