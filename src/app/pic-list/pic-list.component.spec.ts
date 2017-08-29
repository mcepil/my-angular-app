import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiclistComponent } from './piclist.component';

describe('PiclistComponent', () => {
  let component: PiclistComponent;
  let fixture: ComponentFixture<PiclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
