import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaRegisterComponent } from './ta-register.component';

describe('TaRegisterComponent', () => {
  let component: TaRegisterComponent;
  let fixture: ComponentFixture<TaRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
