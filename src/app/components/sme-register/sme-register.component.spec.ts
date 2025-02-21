import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeRegisterComponent } from './sme-register.component';

describe('SmeRegisterComponent', () => {
  let component: SmeRegisterComponent;
  let fixture: ComponentFixture<SmeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmeRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
