import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryJsonPlaceholderService } from './api/json-placeholder-data.service';

import { AppComponent } from './app.component';
import { PicListComponent } from './pic-list/pic-list.component';
import { JsonPlaceholderService } from './services/json-placeholder.service';
import { PicListItemComponent } from './pic-list-item/pic-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PicListComponent,
    PicListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryJsonPlaceholderService)
  ],
  providers: [ JsonPlaceholderService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
