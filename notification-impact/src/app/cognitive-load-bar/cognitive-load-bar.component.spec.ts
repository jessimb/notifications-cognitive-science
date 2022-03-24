import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitiveLoadBarComponent } from './cognitive-load-bar.component';

describe('CognitiveLoadBarComponent', () => {
  let component: CognitiveLoadBarComponent;
  let fixture: ComponentFixture<CognitiveLoadBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CognitiveLoadBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitiveLoadBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
