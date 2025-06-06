import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessoresEditarComponent } from './professores-editar.component';

describe('ProfessoresEditarComponent', () => {
  let component: ProfessoresEditarComponent;
  let fixture: ComponentFixture<ProfessoresEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessoresEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessoresEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
