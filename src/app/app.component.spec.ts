import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const title = 'M.Cepil\'s App';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(component.title).toEqual(title);
  });

  it('should render default title in a h3 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain(`Welcome to ${component.title}!`);
  }));

  it('should render title in a h3 tag', async(() => {
    const testTitle = 'Test Title.';
    component.title = testTitle;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain(`Welcome to ${testTitle}!`);
  }));
});
