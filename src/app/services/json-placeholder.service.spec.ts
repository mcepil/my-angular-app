import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { JsonPlaceholderService } from './json-placeholder.service';

describe('JsonPlaceholderService', () => {
  const mockItem =  {
    'albumId': 1,
    'id': 1,
    'title': 'fake title',
    'url': 'http://fake.url.com',
    'thumbnailUrl': 'http://fake.url.com/thumb'
  };

  const mockBackendResponse = (mockBackend: MockBackend, response: any, status: number = 200) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify({data: response}),
        status
      }));
    });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        JsonPlaceholderService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([JsonPlaceholderService], (service) => {
    expect(service).toBeTruthy();
  }));

  it('should get images', inject([JsonPlaceholderService, XHRBackend], (service, mockBackend) => {
    mockBackendResponse(mockBackend, [ mockItem ]);

    service.getImages().then(images => {
      expect(images).toBeTruthy();
      expect(images.length).toBe(1);
      const image = images[0];
      expect(image.albumId).toEqual(mockItem.albumId);
      expect(image.id).toEqual(mockItem.id);
      expect(image.title).toEqual(mockItem.title);
      expect(image.url).toEqual(mockItem.url);
      expect(image.thumbnailUrl).toEqual(mockItem.thumbnailUrl);
    });
  }));

  it('should handle request errors', fakeAsync(() => inject([JsonPlaceholderService, XHRBackend], (service, mockBackend) => {
    mockBackendResponse(mockBackend, undefined, 404);
    spyOn(console, 'error');

    service.getImages().catch(error => {
      expect(error).toBeTruthy();
    });
    tick();

    expect(console.error).toHaveBeenCalled();
  })));
});
