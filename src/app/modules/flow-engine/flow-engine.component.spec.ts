import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowEngineComponent } from './flow-engine.component';

describe('FlowEngineComponent', () => {
  let component: FlowEngineComponent;
  let fixture: ComponentFixture<FlowEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
