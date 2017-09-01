import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement, Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

import { PicListComponent } from './pic-list.component';
import { JsonPlaceholderService } from '../services/json-placeholder.service';
import { click } from '../test';

class Page {
  btnRefresh: DebugElement;
  noItemsInfo: HTMLElement;
  picListItems: DebugElement[];
  btnPrevious: DebugElement;
  btnNext: DebugElement;
  pageLabel: HTMLElement;
  btnCloseModal: DebugElement;
  modalImage: DebugElement;
  modalInfo: HTMLElement;
  modalLoader: DebugElement;

  getPageElements(fixture: ComponentFixture<PicListComponent>) {
    const debugElement = fixture.debugElement;
    this.btnRefresh = debugElement.query(By.css('#btnRefresh'));

    if (debugElement.query(By.css('#items-container'))) {
      this.btnPrevious = debugElement.query(By.css('#btnPrevious'));
      this.btnNext = debugElement.query(By.css('#btnNext'));
      this.pageLabel = debugElement.query(By.css('.page-label')).nativeElement;
      this.picListItems = debugElement.queryAll(By.css('app-pic-list-item'));
    } else {
      this.noItemsInfo = debugElement.query(By.css('#no-items-info')).nativeElement;
    }

    if (debugElement.query(By.css('.ng-overlay'))) {
      this.btnCloseModal = debugElement.query(By.css('.close-popup'));
      this.modalImage = debugElement.query(By.css('img.effect'));
      this.modalInfo = debugElement.query(By.css('.info-text')).nativeElement;
      this.modalLoader = debugElement.query(By.css('.uil-ring-css'));
    }
  }
}

class FixturePage {
  fixture: ComponentFixture<PicListComponent>;
  page: Page;

  constructor(fixture: ComponentFixture<PicListComponent>) {
    this.fixture = fixture;
  }

  refresh = () => {
    this.fixture.detectChanges();
    this.fixture.whenStable().then(() => {
      this.page = new Page();
      this.page.getPageElements(this.fixture);
    });
  }
}

@Injectable()
class MockJsonPlaceholderService {
  getImages = () => {
    return Promise.resolve([]);
  }
}

describe('PiclistComponent', () => {
  let component: PicListComponent;
  let fixture: FixturePage;
  let jsonService: MockJsonPlaceholderService;
  const mockItem1 =  {
    'albumId': 1,
    'id': 1,
    'title': 'fake title',
    'url': 'http://fake.url.com',
    'thumbnailUrl': 'http://fake.url.com/thumb'
  };
  const mockItem2 =  {
    'albumId': 2,
    'id': 2,
    'title': 'fake title 2',
    'url': 'http://fake2.url.com',
    'thumbnailUrl': 'http://fake2.url.com/thumb'
  };

  beforeEach(async(() => {
    jsonService = new MockJsonPlaceholderService();

    TestBed.configureTestingModule({
      declarations: [ PicListComponent ],
      providers: [
        { provide: JsonPlaceholderService, useValue: jsonService }
      ],
      imports: [ HttpModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .overrideComponent(PicListComponent, {
      set: {
        providers: [
          { provide: JsonPlaceholderService, useValue: jsonService }
        ]
      }
    })
    .compileComponents();

    const componentFixture = TestBed.createComponent(PicListComponent);
    component = componentFixture.componentInstance;
    fixture = new FixturePage(componentFixture);
    fixture.refresh();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show \'Refresh\' button', () => {
    expect(fixture.page.btnRefresh).toBeTruthy();
    expect(fixture.page.btnRefresh.nativeElement.textContent).toContain('Refresh');
  });

  it('should show \'no items loaded\' by default', () => {
    expect(fixture.page.noItemsInfo).toBeTruthy();
    expect(fixture.page.noItemsInfo.textContent).toContain('Please refresh.');
  });

  it('should use JsonPlaceholderService to get images when onRefreshPicList called', () => {
    spyOn(jsonService, 'getImages').and.callThrough();
    component.onRefreshPicList();
    expect(jsonService.getImages).toHaveBeenCalled();
  });

  // it('should use JsonPlaceholderService to get images when Refresh clicked', () => {
  //   spyOn(jsonService, 'getImages').and.callThrough();
  //   click(fixturePage.page.btnRefresh);
  //   expect(jsonService.getImages).toHaveBeenCalled();
  // });

  it('should use set refreshing flag when onRefreshPicList called', fakeAsync(() => {
    component.onRefreshPicList();
    expect(component.refreshing).toBeTruthy();
    tick();
    expect(component.refreshing).toBeFalsy();
  }));

  it('should not show item controls when empty list loaded', fakeAsync(() => {
    component.onRefreshPicList();
    tick();
    expect(fixture.page.pageLabel).toBeFalsy();
    expect(fixture.page.noItemsInfo).toBeTruthy();
  }));

  it('should show item controls when non-empty list loaded', fakeAsync(() => {
    spyOn(jsonService, 'getImages').and.returnValue(
      Promise.resolve([
        mockItem1,
        mockItem2
    ]));
    component.onRefreshPicList();
    tick();
    fixture.refresh();
    tick();

    expect(fixture.page.noItemsInfo).toBeFalsy();
    expect(fixture.page.pageLabel).toBeTruthy();
    expect(fixture.page.pageLabel.textContent).toContain('Page: 1');
    expect(fixture.page.btnNext).toBeTruthy();
    expect(fixture.page.btnNext.nativeElement.disabled).toBeTruthy();
    expect(fixture.page.btnPrevious).toBeTruthy();
    expect(fixture.page.btnPrevious.nativeElement.disabled).toBeTruthy();
  }));

  it('should show images', fakeAsync(() => {
    spyOn(jsonService, 'getImages').and.returnValue(
      Promise.resolve([
        mockItem1,
        mockItem2
      ])
    );
    component.onRefreshPicList();
    tick();
    fixture.refresh();
    tick();

    expect(fixture.page.noItemsInfo).toBeFalsy();
    expect(fixture.page.picListItems).toBeTruthy();
    expect(fixture.page.picListItems.length).toBe(2);
  }));

  it('should show 35 items on a page', fakeAsync(() => {
    spyOn(jsonService, 'getImages').and.returnValue(
      Promise.resolve(Array(36).fill(mockItem1))
    );
    component.onRefreshPicList();
    tick();
    fixture.refresh();
    tick();

    expect(fixture.page.btnNext.nativeElement.disabled).toBeFalsy();
    expect(fixture.page.picListItems.length).toBe(35);
    expect(fixture.page.btnPrevious.nativeElement.disabled).toBeTruthy();
  }));

  it('should flip pages', fakeAsync(() => {
    spyOn(jsonService, 'getImages').and.returnValue(
      Promise.resolve(Array(36).fill(mockItem1))
    );
    component.onRefreshPicList();
    tick();
    fixture.refresh();
    tick();

    click(fixture.page.btnNext);
    fixture.refresh();
    tick();
    expect(fixture.page.btnPrevious.nativeElement.disabled).toBeFalsy();
    expect(component.currentPage).toBe(2);
    expect(fixture.page.pageLabel.textContent).toContain('Page: 2');
    expect(fixture.page.picListItems.length).toBe(1);
    expect(fixture.page.btnNext.nativeElement.disabled).toBeTruthy();

    click(fixture.page.btnPrevious);
    fixture.refresh();
    tick();
    expect(fixture.page.btnPrevious.nativeElement.disabled).toBeTruthy();
    expect(component.currentPage).toBe(1);
    expect(fixture.page.pageLabel.textContent).toContain('Page: 1');
    expect(fixture.page.picListItems.length).toBe(35);
    expect(fixture.page.btnNext.nativeElement.disabled).toBeFalsy();
  }));

  it('should set currentImage when onShowPicModal called', fakeAsync(() => {
    component.onShowPicModal(mockItem1);

    expect(component.currentImage).toBeTruthy();
    expect(component.currentImage).toBe(mockItem1);
  }));

  it('should open modal when onShowPicModal called', fakeAsync(() => {
    component.onShowPicModal(mockItem1);
    fixture.refresh();
    tick();

    expect(component.opened).toBeTruthy();
    expect(fixture.page.btnCloseModal).toBeTruthy();
    expect(fixture.page.modalImage).toBeTruthy();
    expect(fixture.page.modalInfo).toBeTruthy();
    expect(fixture.page.modalInfo.textContent).toContain(mockItem1.title);
  }));

  it('should show loader in modal', fakeAsync(() => {
    component.onShowPicModal(mockItem1);
    fixture.refresh();
    tick();

    expect(component.loading).toBeTruthy();
    expect(fixture.page.modalLoader).toBeTruthy();
  }));

  it('should hide loader in modal when image loaded', fakeAsync(() => {
    component.onShowPicModal(mockItem1);
    component.onImageModalLoaded();
    fixture.refresh();
    tick();

    expect(component.loading).toBeFalsy();
    expect(fixture.page.modalLoader).toBeFalsy();
  }));

  it('should close modal dialog', fakeAsync(() => {
    component.onShowPicModal(mockItem1);
    fixture.refresh();
    tick();

    click(fixture.page.btnCloseModal);
    fixture.refresh();
    tick();

    expect(component.opened).toBeFalsy();
    expect(fixture.page.btnCloseModal).toBeFalsy();
  }));
});
