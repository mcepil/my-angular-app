import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { PicItem } from '../model/pic-item';

@Component({
  selector: 'app-pic-list-item',
  templateUrl: './pic-list-item.component.html',
  styleUrls: ['./pic-list-item.component.scss']
})
export class PicListItemComponent implements OnInit {

  @Input() picItem: PicItem;

  @Output() show: EventEmitter<PicItem> = new EventEmitter<PicItem>();

  constructor() { }

  ngOnInit() {
  }

  showModalGallery = (item: PicItem) => {
    this.show.emit(item);
  }

}
