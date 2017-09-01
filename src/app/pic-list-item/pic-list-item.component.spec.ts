import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PicListItemComponent } from './pic-list-item.component';
import { PicItem } from '../model/pic-item';
import { click } from '../test';

class Page {
  image: DebugElement;
  caption: HTMLElement;

  getPageElements(fixture: ComponentFixture<PicListItemComponent>) {
    const debugElement = fixture.debugElement;
    this.image = debugElement.query(By.css('.image'));
    this.caption = debugElement.query(By.css('.caption')).nativeElement;
  }
}

describe('PicListItemComponent', () => {
  let component: PicListItemComponent;
  let fixture: ComponentFixture<PicListItemComponent>;
  let page: Page;
  let eventItem: PicItem;
  const mockItem =  {
    'albumId': 1,
    'id': 1,
    'title': 'fake title',
    'url': 'http://fake.url.com',
    'thumbnailUrl': 'http://fake.url.com/thumb'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    eventItem = undefined;
    fixture = TestBed.createComponent(PicListItemComponent);
    component = fixture.componentInstance;
    component.show.subscribe((item: PicItem) => eventItem = item);
    component.picItem = mockItem;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      page = new Page();
      page.getPageElements(fixture);
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    expect(page.caption).toBeTruthy();
    expect(page.caption.textContent).toContain(mockItem.title);
  });

  it('should display image', () => {
    expect(page.image).toBeTruthy();
    expect(page.image.properties.src).toEqual(mockItem.thumbnailUrl);
    expect(page.image.properties.alt).toEqual(mockItem.id);
  });

  it('should raise show event when showModalGallery is called', () => {
    component.showModalGallery();
    expect(eventItem).toBe(mockItem);
  });

  it('should raise show event when image clicked', () => {
    click(page.image);
    expect(eventItem).toBe(mockItem);
  });
});
