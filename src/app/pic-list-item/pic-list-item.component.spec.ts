import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicListItemComponent } from './pic-list-item.component';

describe('PicListItemComponent', () => {
  let component: PicListItemComponent;
  let fixture: ComponentFixture<PicListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
