import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import '../../../node_modules/rxjs/add/operator/toPromise';

import { PicItem } from '../model/pic-item';

@Injectable()
export class JsonPlaceholderService {

  jsonImageUrl = 'api/picItems';

  constructor(private http: Http) { }

  getImages(): Promise<PicItem[]> {
    return this.http.get(this.jsonImageUrl)
      .toPromise()
      .then(response => response.json().data as PicItem[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An http error occurred', error);
    return Promise.reject(error);
  }
}
